beforeEach(() => {
  jest.resetModules()
})

test('it creates custom logger object', () => {
  global.console = { log() { } }
  const { createLogger } = require('../createLogger')
  const logger = createLogger('foo/bar')

  expect(logger._identifier).toBe('foo/bar')
  expect(logger._prefix).toBe('[ foo/bar ]')
  expect(typeof logger.log).toBe('function')

  const logged0 = logger.log('a', 'b', 'c')
  expect(logged0).toEqual(expect.stringContaining(`a\nb\nc`))
})