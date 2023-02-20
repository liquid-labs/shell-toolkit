/* global describe expect test */
import { tryExec } from '../try-exec'

describe('tryExec', () => {
  test("'echo foo' succeeds and outputs 'foo'", () => {
    const result = tryExec('echo foo')
    expect(result.code).toBe(0)
    expect(result.trim()).toEqual('foo')
    expect(result.stdout.trim()).toEqual('foo')
  })

  test("uses 'msg' in as excepton message", () =>
    expect(() => tryExec('blahblahblah', { msg : 'what' })).toThrow(/what/))

  test('makes result available to msgFunc', () =>
    expect(() => tryExec('blahblahblah', { msgFunc : (result) => `Exit status: ${result.code}` }))
      .toThrow(/Exit status: \d+/))

  test('reflects command in exception message', () => expect(() => tryExec('blahblahblah')).toThrow(/blahblahblah/))

  test("'noThrow=true' supresses the throw on error behavior", () => {
    const result = tryExec('blahblahblah', { noThrow : true })
    expect(result.code).not.toBe(0)
  })
})
