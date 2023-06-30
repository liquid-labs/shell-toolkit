import shell from 'shelljs'

import { errorMsg } from './lib/error-msg'

/**
 * Asynchronously executes a shell command and returns a promise that resolves
 * with the result: `{code, stdout, stderr}`.
 *
 * The `opts` object will be passed to shelljs's `exec()` and then to Node's native
 * `child_process.exec()`. The most commonly used opts properties are:
 *
 * - cwd (string) - A full path to the working directory to execute the `cmd` in
 * - silent (boolean) - If `true` (default), the process won't log to `stdout`
 *
 * See shell.js docs: https://github.com/shelljs/shelljs#execcommand--options--callback
 * See Node docs: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
 *
 * @example
 *
 *     const execAsync = require('execAsync');
 *     execAsync('ls -al', { silent: true, cwd: '/Users/admin/' });
 *
 * @param cmd  (string) - The shell command to execute
 * @param opts (object) - 'msg' and 'msgFunc' (which gets the results) may be used to specify or generate messages on failure. Any other opts are passed to shelljs.exec and then the notiv exec (see doc references)
 * @returns {String.<Promise>} - Resolves with the command results from `stdout`
 */
const tryExecAsync = (cmd, { noThrow, ...opts } = {}) => {
  return new Promise(function(resolve, reject) {
    // Execute the command, reject if we exit non-zero (i.e. error)
    shell.exec(cmd, { silent : true, ...opts }, function(code, stdout, stderr) {
      const result = new String(stdout) // eslint-disable-line no-new-wrappers
      result.code = code
      result.stderr = stderr
      result.stdout = stdout

      if (code !== 0 && noThrow !== true) {
        return reject(new Error(errorMsg({ cmd, result, ...opts })))
      }
      // else; we mimic the behaviro of the underling shelljs.exec

      return resolve(result)
    })
  })
}

export { tryExecAsync }
