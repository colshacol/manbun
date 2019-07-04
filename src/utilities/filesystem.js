import fs from 'fs'

export const pathsExist = (targets) => {
  return targets.every(pathToTest => {
    return fs.existsSync(pathToTest)
  })
}

export const readFile = (filePath, charset = 'utf8') => {
  return fs.readFileSync(filePath, charset)
}