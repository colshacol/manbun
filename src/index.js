#!/usr/bin/env node

import meow from 'meow'

import { setup } from './setup'
import { build } from './build'

import { PKG } from './consts'

const CLI_CONFIGURATION = {
  flags: {
    help: {
      type: 'boolean'
    }
  }
}

const HELP_OUTPUT = `
Usage
  $ manbun <command> [...options]

Commands
  setup           Scaffolds the directories and sets up new bundle repos.
  build           Builds source files to their final DS resting places.

Options
  --help          Shows you this wonderful help menu.

Examples
  $ manbun setup
  $ manbun --help
`

const cli = meow(HELP_OUTPUT, CLI_CONFIGURATION);
const command = cli.input[0]
const options = { pkg: PKG, flags: cli.flags }

command === 'setup' && setup(options)
command === 'build' && build(options)

