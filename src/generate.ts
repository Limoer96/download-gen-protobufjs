import * as fse from 'fs-extra'
import * as path from 'path'
import * as chalk from 'chalk'
import * as childProcess from 'child_process'
import { IConfig } from './const'
import { checkConfig, readConfig } from './utils/readConfig'
/**
 * 获取proto文件相对根目录的=pathList
 * @param dirPath 当前目录的path
 * @param basePath 根目录path
 * @param fileRelativePathList 相对pathList
 */
function getProtobufFilesRelativePath(dirPath: string, basePath: string, fileRelativePathList: string[]) {
  const files = fse.readdirSync(dirPath, { encoding: 'utf-8' })
  for (const file of files) {
    const filePath = path.join(dirPath, file)
    if (fse.statSync(filePath).isDirectory()) {
      getProtobufFilesRelativePath(filePath, basePath, fileRelativePathList)
    } else {
      const relativePath = path.relative(basePath, filePath)
      fileRelativePathList.push(relativePath)
    }
  }
}

export default async function generate(config?: IConfig) {
  if (!config) {
    const conf = await readConfig().then(checkConfig)
    config = conf
  }
  const rootPath = path.resolve(process.cwd(), config.root)
  const exist = fse.existsSync(rootPath)
  if (!exist) {
    console.log(chalk.red(`${rootPath} does not exist. check gpc-config.json and run command again.`))
    process.exit(1)
  } else {
    const paths = []
    getProtobufFilesRelativePath(rootPath, rootPath, paths)
    const outputPath = path.resolve(process.cwd(), config.output)
    // 判断目标目录存在与否，如果不存在，则需要先新建一个空的目录
    const command = `protoc --proto_path=. ${paths.join(
      ' '
    )} --grpc-web_out=import_style=typescript,mode=grpcwebtext:${outputPath} --js_out=import_style=commonjs,binary:${outputPath}`
    try {
      if (!fse.existsSync(outputPath)) {
        fse.mkdirSync(outputPath)
      }
    } catch (error) {
      console.log(chalk.red`Error happend when generate dir: ${outputPath}`, error)
      process.exit(1)
    }
    childProcess.exec(command, { cwd: path.resolve(process.cwd(), config.root) }, (error) => {
      if (error) {
        console.log(chalk.red('Error happend when run command: ', command, 'Error:', error.message))
        process.exit(1)
      } else {
        console.log(chalk.green('generate protobuf javascript file success!'))
      }
    })
  }
}
