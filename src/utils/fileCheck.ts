import * as fse from 'fs-extra'
import * as path from 'path'

export function checkLocalJsProtoBufFile(dirPath: string) {
  return new Promise((resolve, reject) => {
    try {
      const exist = fse.existsSync(dirPath)
      if (exist) {
        return resolve(true)
      }
      return resolve(false)
    } catch (error) {
      reject(error)
    }
  })
}
