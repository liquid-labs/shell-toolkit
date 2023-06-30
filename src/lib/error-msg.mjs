const errorMsg = ({ cmd, msg = '', msgFunc, result, stderr }) => {
  if (msg.length > 0) msg += ' '
  if (msgFunc !== undefined) msg += msgFunc(result) + ' '
  msg += `Failed to execute '${cmd}'; stderr: ${result.stderr}`

  return msg
}

export { errorMsg }