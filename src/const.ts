import * as path from 'path'
import * as os from 'os'

export const tempFileName = `${os.tmpdir()}/grpc-remote`

export interface IConfig {
  url: string
  root?: string
  output?: string
  sourcePath?: string
  clientWrapper?: {
    name?: string
    path?: string
  }
}

const fileName = 'gpc-config.json'
export const clientFileName = 'clients.ts'

export const configFilePath = path.resolve(process.cwd(), fileName)
export const clientFileTargetPath = path.resolve(process.cwd(), 'src')

export const configTemplate: IConfig = {
  root: 'proto',
  output: 'src/proto',
  url: 'https://github.com/userName/repos.git',
  sourcePath: 'src/target/path',
}

export const INIT_CONFIG: IConfig = {
  root: 'proto',
  output: 'src/proto',
  url: 'https://gitee.com/fruits-chain/fruitschain-grpc.git',
  sourcePath: 'src',
}
