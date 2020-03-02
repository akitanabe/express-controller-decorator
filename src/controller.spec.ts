import express from 'express';
import { Get, Controller, BaseController } from './Controller';
import request from 'supertest';

describe('controller', function() {
  @Controller('/test')
  class TestController extends BaseController {
    @Get()
    index(): string {
      return 'ok';
    }

    @Get('/show')
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
