import { MockRequest } from './index'
import { MockSocket } from './mock-request'

const req = new MockRequest()

test('mocks remote address', () => {
   const socket = new MockSocket()
   expect(socket.remoteAddress).toBeUndefined()
   socket.mockRemoteAddress = 'whatever'
   expect(socket.remoteAddress).toBe('whatever')
})

test('allows setting and reading the referer', () => {
   req.referer = 'http://2323423423.copyrightclaims.org'
   expect(req.get('referer')).toBe('http://2323423423.copyrightclaims.org')
})

test('allows setting and reading querystring parameters', () => {
   req.params['key'] = 'value'
   expect(req.params['key']).toBe('value')
})

test('allows setting and reading header values', () => {
   req.headers['key'] = 'value'
   expect(req.header('key')).toBe('value')
})
