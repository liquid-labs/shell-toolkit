import shell from 'shelljs'

import { errorMsg } from './lib/error-msg'
import { resultSummary } from './lib/result-summary'

/**
 * Executes a shell command. See {@link tryExecAsync} for the documeentation.
 */
const tryExec = (cmd, { noThrow = false, silent = true, ...opts } = {}) => {
  const execResult = shell.exec(cmd, { silent, ...opts })

  const result = new String(execResult.stdout) // eslint-disable-line no-new-wrappers
  result.code = execResult.code
  result.stderr = execResult.stderr
  result.stdout = execResult.stdout
  result.summary = resultSummary({ cmd, result })

  if (result.code !== 0 && noThrow !== true) {
    throw new Error(errorMsg({ ...opts, result }))
  }

  return result
}

export { tryExec }
