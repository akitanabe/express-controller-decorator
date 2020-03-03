import express, { RequestHandler } from 'express';
import request from 'supertest';
import { Controller, BaseController } from './Controller';
import { Get } from './Methods';
import { Middleware } from './Middleware';

describe('Middleware', function() {
  const app = express();

  const middleware1: RequestHandler = function(req, res, next) {
    res.send({ middleware: true });
    res.end();
  };

  const order: string[] = [];
  const middleware2_0: RequestHandler = function(req, res, next) {
    order.push('middleware2_0');
    next();
  };

  const middleware2_1: RequestHandler = function(req, res, next) {
    order.push('middleware2_1');
    next();
  };

  const middleware2_2: RequestHandler = function(req, res, next) {
    order.push('middleware2_2');
    next();
  };

  @Controller('/test')
  class TestController extends BaseController {
    @Get('/middleware1')
    @Middleware(middleware1)
    middleware1(): { ok: boolean } {
      return { ok: true };
    }

    @Middleware(middleware2_0)
    @Middleware(middleware2_1)
    @Middleware(middleware2_2)
    @Get('/middleware2')
    middleware2(): void {
      order.push('controller');
    }
  }

  app.use(new TestController().route);

  it('middleware stop default function', (done) => {
    request(app)
      .get('/test/middleware1')
      .then((res) => {
        expect(res.body).toEqual({ middleware: true });
        done();
      });
  });

  it('middleware order is collect', (done) => {
    request(app)
      .get('/test/middleware2')
      .then(() => {
        expect(order).toEqual([
          'middleware2_0',
          'middleware2_1',
          'middleware2_2',
          'controller',
        ]);
        done();
      });
  });
});
