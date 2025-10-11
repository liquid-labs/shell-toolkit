import shell from 'shelljs'

import { errorMsg } from './lib/error-msg'

/**
 * Executes a shell command. See {@link tryExecAsync} for the documeentation.
 */
const tryExec = (cmd, { noThrow = false, silent = true, ...opts } = {}) => {
  const execResult = shell.exec(cmd, { silent, ...opts })

  const result = new String(execResult.stdout) // eslint-disable-line no-new-wrappers
  result.code = execResult.code
  result.stderr = execResult.stderr
  result.stdout = execResult.stdout

  if (result.code !== 0 && noThrow !== true) {
    throw new Error(errorMsg({ cmd, result, ...opts }))
  }

  return result
}

export { tryExec }
