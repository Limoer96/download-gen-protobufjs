const fs = require('fs')
const fsp = require('fs/promises')
const path = require('path')

const fileName = 'protoc-config.json'

const configFilePath = path.resolve(process.cwd(), fileName)

function checkConfigFile() {
  const exist = fs.existsSync(configFilePath)
  if (!exist) {
  }
}

async function readConfig() {
  return fs.readFile(configFilePath).then((str) => JSON.parse(str))
}

exports.readConfig = readConfig
