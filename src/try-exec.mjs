import createError from 'http-errors'
import shell from 'shelljs'

const tryExec = (cmd, { httpStatus = 500, msg = '', msgFunc, noThrow = false } = {}) => {
  const result = shell.exec(cmd, { silent : true })
  if (result.code !== 0 && noThrow !== true) {
    if (msg.length > 0) msg += ' '
    if (msgFunc !== undefined) msg += msgFunc(result) + ' '

    throw createError(httpStatus, msg + `Failed to execute '${cmd}'; stderr: ${result.stderr}`)
  }

  return result
}

export { tryExec }
