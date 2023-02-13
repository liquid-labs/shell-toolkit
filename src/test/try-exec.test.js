/* global describe expect test */
import { tryExec } from '../try-exec'

describe('tryExec', () => {
  test("'echo foo' succeeds and outputs 'foo'", () => {
    const result = tryExec('echo foo')
    expect(result.code).toBe(0)
    expect(result.trim()).toEqual('foo')
    expect(result.stdout.trim()).toEqual('foo')
  })

  test('repeats command on error', () => expect(() => tryExec('blahblahblah')).toThrow(/blahblahblah/))
})
