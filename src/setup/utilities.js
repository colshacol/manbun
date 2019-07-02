import shell from 'shelljs'

import { cwdResolve } from '../utilities'

export const createDirectory = (relativePath) => {
  const finalPath = cwdResolve(relativePath)
  const alreadyExists = shell.test('-e', finalPath)
  !alreadyExists && shell.mkdir(finalPath)
}

export const createGitKeep = (relativePath) => {
  const finalPath = `${cwdResolve(relativePath)}/.gitkeep`
  const alreadyExists = shell.test('-e', finalPath)
  !alreadyExists && shell.ShellString('').toEnd(finalPath);
}

export const createReadme = (packageName = "") => {
  const finalPath = cwdResolve('README.md')
  const alreadyExists = shell.test('-e', finalPath)
  !alreadyExists && shell.ShellString(`# ${packageName}`).toEnd(finalPath);
}