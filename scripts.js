const shell = require('shelljs')

const command = process.argv[2]

const pathExists = (relativePath) => {
  return shell.test('-e', relativePath)
}

const removeDirectory = (relativePath) => {
  const exists = pathExists(relativePath)
  exists && shell.rm('-rf', relativePath)
}

const createDirectory = (relativePath) => {
  const alreadyExists = pathExists(relativePath)
  !alreadyExists && shell.mkdir(relativePath)
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
  copyFile('./package.json', './bin')
  copyFile('./babel.config.js', './bin');
  copyFile('./prettier.config.js', './bin');
  execute('./node_modules/.bin/babel src --out-dir bin')
}

if (command === "push") {
  const commitMessage = process.argv[3]

  console.log(commitMessage)

  execute('git add .')
  execute(`git commit -m "${commitMessage}"`)
  execute('git push')
}


