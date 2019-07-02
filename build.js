const shell = require('shelljs')

const createDirectory = (relativePath) => {
  const alreadyExists = shell.test('-e', relativePath)
  !alreadyExists && shell.mkdir(relativePath)
}

const binExists = shell.test('-e', './bin')

!binExists && createDirectory('./bin')
shell.cp('./babel.config.js', './bin');
shell.cp('./prettier.config.js', './bin');

shell.exec('./node_modules/.bin/babel src --out-dir bin')


