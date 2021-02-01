import * as fs from 'fs'
import * as fsp from 'fs/promises'
import * as inquirer from 'inquirer'
import * as chalk from 'chalk'
import * as prettier from 'prettier'
import { configFilePath, configTemplate, IConfig, INIT_CONFIG } from '../const'
import { is } from './common'

function checkConfigFile() {
  return new Promise<boolean>((resolve) => {
    const exist = fs.existsSync(configFilePath)
    if (exist) {
      resolve(true)
    } else {
      // 用户决定是否创建
      const question: inquirer.QuestionCollection = {
        type: 'confirm',
        name: 'addConfig',
        message:
          chalk.yellow('Could not find configuration file.') +
          '\n\n' +
          'would you want to add default at: ' +
          chalk.bold(configFilePath),
        default: true,
      }
      inquirer.prompt(question).then((answer) => {
        if (!answer.addConfig) {
          console.log(
            chalk.red(
              'We need related configuration to run this tool. Please configure the necessary configuration before continuing.'
            )
          )
          process.exit(0)
        }
        fs.writeFileSync(configFilePath, prettier.format(JSON.stringify(configTemplate), { parser: 'json' }))
        console.log(chalk.green('generate config file success, edit it and run command again!'))
        resolve(false)
      })
    }
  })
}

export function checkConfig(config: IConfig) {
  if (!config || isAndEmpty(config, 'object', (value) => Object.keys(value).length === 0)) {
    return null
  }
  console.log(`warning: ${chalk.yellow('Unconfigured items will use the default configuration')}`)
  return {
    ...INIT_CONFIG,
    ...config,
  }
}

function isAndEmpty(value: any, type: string, check: (value: any) => boolean) {
  return is(value, type) && check(value)
}

export async function readConfig() {
  const continued = await checkConfigFile()
  if (!continued) {
    return null
  }
  const file = await fsp.readFile(configFilePath, { encoding: 'utf-8' })
  return JSON.parse(file)
}
