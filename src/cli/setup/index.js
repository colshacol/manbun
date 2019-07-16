import shell from 'shelljs'

import { createGitKeep, createDirectory, createReadme } from './utilities'

const createDirectories = () => {
  createDirectory('./components')
  createDirectory('./security')
  createDirectory('./auth')
  createDirectory('./widgets')
  createDirectory('./content')
  createDirectory('./actions')
}

const createGitKeeps = () => {
  createGitKeep('./components')
  createGitKeep('./security')
  createGitKeep('./auth')
  createGitKeep('./widgets')
  createGitKeep('./content')
  createGitKeep('./actions')
}

export const setup = (context) => {
  console.log('[ manbun ] SETUP STARTING')

  createDirectories()
  createGitKeeps()
  createReadme()

  console.log('[ manbun ] SETUP SUCCESSFUL')
}