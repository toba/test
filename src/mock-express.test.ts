import { MockExpressApp } from './index'
import { MockMiddleware } from './mock-express'

const app = new MockExpressApp()
const handler = jest.fn()

test('combines routes', () => {
   const route1 = new MockMiddleware()
   const route2 = new MockMiddleware()

   route1.get('/one', handler)
   route1.get('/two', handler)
   route2.get('/three', handler)
   route2.get('/four', handler)

   app.use('/route1', route1)
   app.use('/route2', route2)

   expect(app.routes.get).toHaveKeys('/route1/one')
})
