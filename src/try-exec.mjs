import shell from 'shelljs'

import { errorMsg } from './lib/error-msg'

const tryExec = (cmd, { noThrow = false, ...opts } = {}) => {
  const result = shell.exec(cmd, { silent : true, ...opts })
  if (result.code !== 0 && noThrow !== true) {
    throw new Error(errorMsg({ cmd, result, ...opts }))
  }

  return result
}

export { tryExec }
