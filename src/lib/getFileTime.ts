import { statSync, promises as fsPromises } from 'fs'
import { dirname, join } from 'path'
const { stat } = fsPromises

export const getFileTime = (root: string) => async (path: string) =>
  (await stat(join(dirname(root), path))).mtime.getTime()

export const getFileTimeSync = (root: string) => (path: string) =>
  statSync(join(dirname(root), path)).mtime.getTime()
