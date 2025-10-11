const resultSummary = ({ cmd, result }) => {
  return `'${cmd}' (code: ${result.code}); stderr: ${result.stderr}; stdout: ${result.stdout})`
}

export { resultSummary }
