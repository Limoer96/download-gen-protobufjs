import download from './download'
import generate from './generate'
import { Command } from 'commander'

const program = new Command()

program.version('0.0.1')
program.description('download and generate JavaScript protobuf code.')

program
  .allowUnknownOption()
  .option('-i, --init', 'download and generate JavaScript protobuf code.')
  .option('-g, --generate', 'generate JavaScript protobuf code based on local protobuf files.')

program.parse(process.argv)

const options = program.opts()

if (options.init) {
  download()
  generate()
}

if (options.generate) {
  // 仅生成文件
  generate()
}

/**
 * 1. 读取本地配置
 * 2. 下载远程 protobuf文件，并根据配置进行存储
 * 3. 根据配置生成`protoc相关命令`
 * 4. 执行命令，生成JS文件
 */
