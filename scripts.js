const shell = require('shelljs')
const path = require('path')
const latestVersion = require('latest-version')

const command = process.argv[2]

const getPackageJSON = (directoryPath) => {
  return require(path.resolve(directoryPath, 'package.json'))
}

const pathExists = (relativePath) => {
  return shell.test('-e', relativePath)
}

const removeDirectory = (relativePath) => {
  const exists = pathExists(relativePath)
  exists && shell.rm('-rf', relativePath)
  exists && console.log(`[ manbun ] removed ${relativePath}`)
}

const createDirectory = (relativePath) => {
  const exists = pathExists(relativePath)
  !exists && shell.mkdir(relativePath)
  !exists && console.log(`[ manbun ] created ${relativePath}`)
}

const copyFile = (filePath, destinationPath) => {
  shell.cp(filePath, destinationPath);
}

const execute = (command) => {
  shell.exec(command)
}

if (command === 'build') {
  removeDirectory('./bin')
  createDirectory('./bin')
  copyFile('./README.md', './bin')
  copyFile('./babel.config.js', './bin');
  copyFile('./prettier.config.js', './bin');
  copyFile('./.npmignore', './bin');
  execute('./node_modules/.bin/babel src --out-dir bin')
  removeDirectory('./bin/__tests')

  const handlePackageJSON = (version => {
    const binPkg = getPackageJSON('./')
    // const mainPkg = getPackageJSON('./')
    delete binPkg.scripts.prepublishOnly
    binPkg.version = version
    const stringPkg = JSON.stringify(binPkg, null, 2)
    const packageJSON = new shell.ShellString(stringPkg)
    packageJSON.to('./bin/package.json')
  })

  latestVersion('manbun').then(handlePackageJSON)
}

if (command === "push") {
  const commitMessage = process.argv[3]

  execute('git add .')
  execute(`git commit -m "${commitMessage}"`)
  execute('git push')
}


