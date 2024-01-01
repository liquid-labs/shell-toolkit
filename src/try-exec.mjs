import shell from 'shelljs'

import { errorMsg } from './lib/error-msg'

const tryExec = (cmd, { noThrow = true, silent = true, ...opts } = {}) => {
  const result = shell.exec(cmd, { silent, ...opts })
  if (result.code !== 0 && noThrow !== true) {
    throw new Error(errorMsg({ cmd, result, ...opts }))
  }

  return result
}

export { tryExec }
