import express, { Request } from 'express';
import Controller from './Controller';
import Route from './Route';
import { Get, Post, Delete, Put } from './Methods';
import request from 'supertest';

describe('controller', function() {
  @Route('/test')
  class TestController extends Controller {
    @Get()
    index(): string {
      return 'ok';
    }

    @Get('/:id')
    show(req: Request): { id: string } {
      const id = req.params.id as string;
      return { id };
    }

    @Post()
    store(): void {}

    @Put('/:id')
    update(): void {}

    @Delete('/:id')
    destroy(): void {}
  }
  const app = express();

  app.use(new TestController().route);

  it('get index()', (done) => {
    request(app)
      .get('/test')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toBe('ok');
        done();
      });
  });

  const id = 'fe394343';
  it('get show()', (done) => {
    request(app)
      .get(`/test/${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id });
        done();
      });
  });

  it('post store()', function(done) {
    request(app)
      .post('/test')
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('put update()', function(done) {
    request(app)
      .put(`/test/:${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('delete destroy()', function(done) {
    request(app)
      .delete(`/test/:${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
