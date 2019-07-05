const shell = require('shelljs')

const command = process.argv[2]

const createDirectory = (relativePath) => {
  const alreadyExists = shell.test('-e', relativePath)
  !alreadyExists && shell.mkdir(relativePath)
}

const copyFile = (filePath, destinationPath) => {
  shell.cp(filePath, destinationPath);
}

const execute = (command) => {
  shell.exec(command)
}

if (command === 'build') {
  createDirectory('./bin')
  copyFile('./babel.config.js', './bin');
  copyFile('./prettier.config.js', './bin');
  execute('./node_modules/.bin/babel src --out-dir bin')
}

if (command === "publish") {
  const commitMessage = process.argv[3]

  execute('git add .')
  execute(`git commit -m ${commitMessage}`)
  execute('yarn publish')
  execute('git push')
}


