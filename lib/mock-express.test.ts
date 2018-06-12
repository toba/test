import { MockExpressApp } from '../index';
import { MockMiddleware } from './mock-express';

const app = new MockExpressApp();

test('combines routes', () => {
   const route1 = new MockMiddleware();
   const route2 = new MockMiddleware();

   route1.get('/one', null);
   route1.get('/two', null);
   route2.get('/three', null);
   route2.get('/four', null);

   app.use('/route1', route1);
   app.use('/route2', route2);

   expect(app.routes.get).toHaveKeys('/route1/one');
});
