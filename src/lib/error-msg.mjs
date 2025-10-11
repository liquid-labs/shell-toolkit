const errorMsg = ({ msg = '', msgFunc, noSummary, result }) => {
  if (msg.length > 0) msg += ' '
  if (msgFunc !== undefined) msg += msgFunc(result)
  if (noSummary !== true) {
    if (msg.length > 0) msg += ' '
    msg += `Failed to execute ${result.summary}.`
  }

  return msg
}

export { errorMsg }
