const errorMsg = ({ cmd, msg = '', msgFunc, result, stderr }) => {
  if (msg.length > 0) msg += ' '
  if (msgFunc !== undefined) msg += msgFunc(result) + ' '
  msg += `Failed to execute '${cmd}' (${result.code}); stderr: ${result.stderr}; stdout: ${result.stdout}`

  return msg
}

export { errorMsg }
