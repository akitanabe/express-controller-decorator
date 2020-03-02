import express from 'express';
import { get, controller, BaseController } from './controller';
import request from 'supertest';

describe('controller', function() {
  @controller('/test')
  class TestController extends BaseController {
    @get()
    index(): string {
      return 'ok';
    }

    @get('/show')
    show(): { ok: boolean } {
      return { ok: true };
    }
  }
  const app = express();

  app.use(new TestController().route);

  it('method return string', (done) => {
    request(app)
      .get('/test')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toBe('ok');
        done();
      });
  });

  it('method return object', (done) => {
    request(app)
      .get('/test/show')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ ok: true });
        done();
      });
  });
});
