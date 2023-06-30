/* global describe expect fail test */
import { tryExecAsync } from '../try-exec-async'

describe('tryExecAsync', () => {
  test("'echo foo' succeeds and outputs 'foo'", async() => {
    const result = await tryExecAsync('echo foo')
    expect(result.code).toBe(0)
    expect(result.trim()).toEqual('foo')
    expect(result.stdout.trim()).toEqual('foo')
  })

  test("uses 'msg' in as excepton message", async() => {
    try {
      await tryExecAsync('blahblahblah', { msg : 'what' })
      fail('Failed to raise exception when calling missing command.')
    }
    catch (e) {
      expect(e.message).toMatch(/what/)
    }
  })

  test('makes result available to msgFunc', async() => {
    try {
      await tryExecAsync('blahblahblah', { msgFunc : (result) => `Exit status: ${result.code}` })
      fail('Failed to raise exception when calling missing command.')
    }
    catch (e) {
      expect(e.message).toMatch(/Exit status: \d+/)
    }
  })

  test('reflects command in exception message', async() => {
    try {
      await tryExecAsync('blahblahblah')
      fail('Failed to raise exception when calling missing command.')
    }
    catch (e) {
      expect(e.message).toMatch(/blahblahblah/)
    }
  })

  test("'noThrow=true' supresses the throw on error behavior", async() => {
    const result = await tryExecAsync('blahblahblah', { noThrow : true })
    expect(result.code).not.toBe(0)
  })
})
