import { checkConfig, readConfig } from './utils/readConfig'
import * as download from 'download-git-repo'
import * as chalk from 'chalk'
import * as fse from 'fs-extra'
import * as path from 'path'
import { IConfig, tempFileName } from './const'

export default function dowload() {
  return new Promise<IConfig>((resolve, reject) => {
    readConfig()
      .then(checkConfig)
      .then((config) => {
        if (!config) {
          process.exit(0)
          return
        }
        download(`${config.url}`, tempFileName, { clone: true }, function (err) {
          if (err) {
            console.log(chalk.red('download from origin repo failed！'))
            process.exit(1)
          } else {
            fse
              .copy(path.join(tempFileName, config.sourcePath), path.resolve(process.cwd(), config.root))
              .then(() => {
                console.log(chalk.green('file saved at: ', path.resolve(process.cwd(), config.root)))
                try {
                  fse.removeSync(tempFileName) // 删除clone下来的临时目录
                } catch (error) {}
                resolve(config)
              })
              .catch((err) => {
                console.log(chalk.red(err))
                reject('Error happend when save file.')
              })
          }
        })
      })
  })
}
