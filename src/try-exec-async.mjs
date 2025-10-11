import shell from 'shelljs'

import { errorMsg } from './lib/error-msg'
import { resultSummary } from './lib/result-summary'

/**
 * Asynchronously executes a shell command and returns a promise that resolves to the output string, with `code`,
 * `stdout`, and `stderr` fields attached. An `async` option will be overriden and any other options will be passed
 * thru to `shelljs.exec`. This well execute the command string as is, so it is critical to sanatize user input to
 * avoid shell injection attacks.
 * @param {string} cmd - The shell command to execute.
 * @param {Object} [opts] - Exec options.
 * @param {string} [opts.cwd] - An absolute path string specifying the working directory for the command.
 * @param {string} [opts.msg] - A massage to include in any error message. The final error message is:
 * '[[msg] msgFunc(result) ]'${cmd}' (${result.code}); stderr: ${result.stderr}; stdout: ${result.stdout})'.
 * @param {Function} [opts.msgFunc] - A function that takes the exec result and returns a string to include in any
 * error message. See `opts.msg` for final error message format.
 * @param {boolean} [opts.noSummary=false] - If `true`, the `'${cmd}' (code: ...)` part of the error message will be
 * omitted.
 * @param {boolean} [opts.noThrow=false] - If `true`, the promise will not be rejected if the command exits with a
 * non-zero code.
 * @param {string} [opts.shell='sh'] - The path to the shell to use to execute the command.
 * @param {boolean} [opts.silent=true] - If `true`, the process won't log to system `stdout`. The output will be
 * returned as the result.
 * @returns {String.<Promise>} - Resolves with the output string and attaches 'code', 'stdout', 'stderr', and `summary`
 * fields.
 * @example
 *     import { tryExecAsync } from 'shell-toolkit'
 *     # const tryExecAsync = require('shell-toolkit')
 *     tryExecAsync('ls -al', { silent: true, cwd: '/Users/admin/' })
 * @see {@link https://github.com/shelljs/shelljs#execcommand--options--callback shell.js options}
 * @see {@link https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback Node exec options}
 * @see {@link https://github.com/shelljs/shelljs/wiki/Security-guidelines shelljs security guidelines}
 */
const tryExecAsync = (cmd, { noThrow, silent = true, ...opts } = {}) => {
  return new Promise(function(resolve, reject) {
    // Execute the command, reject if we exit non-zero (i.e. error)
    shell.exec(cmd, { silent, ...opts, async : true }, function(code, stdout, stderr) {
      const result = new String(stdout) // eslint-disable-line no-new-wrappers
      result.code = code
      result.stderr = stderr
      result.stdout = stdout
      result.summary = resultSummary({ cmd, result })

      if (code !== 0 && noThrow !== true) {
        return reject(new Error(errorMsg({ ...opts, result })))
      }

      return resolve(result)
    })
  })
}

export { tryExecAsync }
