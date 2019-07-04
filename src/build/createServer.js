import fs from 'fs'

import { prepareServerScript } from './utilities'

export const createServer = (taskData) => {
  fs.writeFileSync(taskData.outputFilePathServer, prepareServerScript(taskData), 'utf8')
}