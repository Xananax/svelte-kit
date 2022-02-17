import YAML from 'js-yaml'
import { promises as fs } from 'fs'
import { join, extname, basename } from 'path'
import { STOP, noOp, EMPTY_ARRAY } from './consts.js'

const EMPTY_RESULT: Result = { dirs: EMPTY_ARRAY, files: EMPTY_ARRAY }
type Result = { dirs: DirectoryNode[]; files: FileNode[] }

interface FileBase {
  filename: string
  path: string
  parent: string
  size: number
  mtime: Date
  ext: string
  name: string
  mimeExt: string
}

interface FileNode extends FileBase {
  isDirectory: false
}
interface DirectoryNode extends FileBase {
  isDirectory: true
  dirs: DirectoryNode[]
  files: FileNode[]
}
export type File = FileNode | DirectoryNode

interface Callback {
  (file: File): any
}

export const statFile = async (parent: string, filename: string) => {
  const path = join(parent, filename)
  const stat = await fs.stat(path)
  const ext = extname(filename)
  const name = basename(filename, ext)
  const mimeExt = ext.slice(1).toLowerCase()
  const { size, mtime } = stat
  const isDirectory = stat.isDirectory()
  const file = {
    filename,
    path,
    parent,
    size,
    mtime,
    ext,
    name,
    mimeExt,
    isDirectory,
    ...(isDirectory ? { dirs: EMPTY_ARRAY, files: EMPTY_ARRAY } : null)
  } as File
  return file
}
export const recursiveReaddir = async <R>(
  parent: string,
  callback: Callback = noOp,
  maximum = 10
) => {
  if (maximum <= 0) {
    return EMPTY_RESULT
  }
  maximum -= 1
  const dirs: DirectoryNode[] = []
  const files: FileNode[] = []
  const filesNames = await fs.readdir(parent)
  const resultsPromises = filesNames.map((filename: string) =>
    statFile(parent, filename)
      .then((node) =>
        node.isDirectory
          ? recursiveReaddir(node.path, callback, maximum).then(
              (children) => ({ ...node, ...children } as DirectoryNode)
            )
          : node
      )
      .then((node) =>
        Promise.resolve(callback(node)).then((result) => {
          if (result !== STOP) {
            if (node.isDirectory) {
              dirs.push(node)
            } else {
              files.push(node as FileNode)
            }
          }
        })
      )
  )
  await Promise.all(resultsPromises)
  return { dirs: dirs.length ? dirs : EMPTY_ARRAY, files: files.length ? files : EMPTY_ARRAY }
}

export type MarkdownFileData = {
  file: File
  data: PostMetadata
  markdown: string
}

export const extractYamlFromMarkdown = async (filename: string) => {
  const contents = await fs.readFile(filename, 'utf-8')
  const [, yamlString, markdown] = contents.split(/--+\n/)
  const data = YAML.load(yamlString, { filename }) as PostMetadata
  return { data, markdown }
}

export const extractYamlFromDirectory = async (dir: string) => {
  const files: MarkdownFileData[] = []

  await recursiveReaddir(dir, async (file) => {
    if (/mdx?/.test(file.mimeExt)) {
      const data = await extractYamlFromMarkdown(file.path)
      files.push({ file, ...data })
    }
  })
  return files
}
