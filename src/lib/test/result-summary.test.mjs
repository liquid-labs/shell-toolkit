/* global describe expect test */
import { resultSummary } from '../result-summary'

describe('resultSummary', () => {
  test('returns the correct summary', () => {
    const cmd = 'foo'
    const code = 0
    const stderr = 'bar'
    const stdout = 'baz'
    const result = { code, stderr, stdout }
    expect(resultSummary({ cmd, result })).toBe(`'${cmd}' (code: 0); stderr: ${stderr}; stdout: ${stdout})`)
  })
})
