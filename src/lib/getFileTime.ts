import { statSync, promises as fsPromises } from 'fs'
const { stat } = fsPromises

export const getFileTime = async (path: string) => (await stat(path)).mtime.getTime()

export const getFileTimeSync = (path: string) => statSync(path).mtime.getTime()
