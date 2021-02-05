import * as chalk from 'chalk'
import { checkLocalJsProtoBufFile } from './utils/fileCheck'
import { checkConfig, readConfig } from './utils/readConfig'
import * as fs from 'fs'
import * as path from 'path'
import { toCamel } from './utils/common'
import * as prettier from 'prettier'
import { clientFileName, clientFileTargetPath } from './const'

function findClientFiles(sourcePath: string, filePathList: string[]) {
  const files = fs.readdirSync(sourcePath)
  for (const file of files) {
    const absFilePath = path.resolve(sourcePath, file)
    if (fs.statSync(absFilePath).isDirectory()) {
      findClientFiles(absFilePath, filePathList)
    } else if (file.endsWith('ClientPb.ts')) {
      // 只加入Client Pb文件
      filePathList.push(absFilePath)
    }
  }
}

function formatToRelativePath(filePath: string, cwd: string) {
  const absPath = path.resolve(filePath)
  return './' + path.relative(cwd, absPath)
}

function genClientFileContent(files: string[], clientWrapper: { name?: string; path?: string }) {
  let importStr = `import ${clientWrapper.name} from "${formatToRelativePath(
    clientWrapper.path,
    clientFileTargetPath
  )}";`
  let contentStr = ''
  for (const file of files) {
    const { name, ext } = path.parse(file)
    const clientName = name.slice(0, name.length - 2)
    const camelClientName = toCamel(clientName)
    const importPath = './' + path.relative(clientFileTargetPath, file.replace(ext, ''))
    importStr += `import {${clientName}} from '${importPath}';`
    contentStr += `export const ${camelClientName} = ${clientWrapper.name}<${clientName}>(${clientName});`
  }
  return importStr + contentStr
}
function formatAndWriteFile(content: string) {
  prettier
    .resolveConfig(path.resolve(process.cwd(), '.prettierrc'))
    .then((options) => {
      fs.writeFileSync(
        path.join(clientFileTargetPath, clientFileName),
        prettier.format(content, { parser: 'typescript', ...options })
      )
    })
    .catch((err) => {
      console.log(
        chalk.yellow('warning: err happended when use local .prittierrc format file. use default options instead.')
      )
      fs.writeFileSync(
        path.join(clientFileTargetPath, clientFileName),
        prettier.format(content, { parser: 'typescript' })
      )
    })
}

async function makeClientsFile() {
  const config = await readConfig().then(checkConfig)
  const sourcePath = path.resolve(process.cwd(), config.output)
  const exist = await checkLocalJsProtoBufFile(sourcePath)
  if (!exist) {
    console.log(chalk.red('Local js protobuf file does not exists.'))
    return
  }
  const clientFilePath = []
  findClientFiles(sourcePath, clientFilePath)
  if (clientFilePath.length === 0) {
    console.log(chalk.yellow(`no client file finded at: ${sourcePath}, generate end.`))
    return
  }
  if (!config.clientWrapper || !config.clientWrapper.path || !config.clientWrapper.name) {
    console.log(chalk.red('no clientWrapper config finded, generate clients file abort.'))
    return
  }
  const content = genClientFileContent(clientFilePath, config.clientWrapper)
  try {
    formatAndWriteFile(content)
    console.log(chalk.green(`generate clients file at: ${clientFileTargetPath} success!`))
  } catch (error) {
    console.log(`error happend when write clients file, ${error}`)
  }
}

export default makeClientsFile
