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

    @Get('/show/:id')
    show(req: Request): { id: string } {
      const id = req.params.id as string;
      return { id };
    }

    @Get('/async/')
    async asyncIndex(): Promise<string> {
      return this.index();
    }

    @Get('/async/show/:id')
    async asyncShow(req: Request): Promise<{ id: string }> {
      return this.show(req);
    }

    @Post()
    store(): void {
      return;
    }

    @Put('/:id')
    update(): void {
      return;
    }

    @Delete('/:id')
    destroy(): void {
      return;
    }
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

  it('get show()', (done) => {
    const id = 'fe394343';
    request(app)
      .get(`/test/show/${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ id });
        done();
      });
  });

  it('get async index()', (done) => {
    request(app)
      .get('/test/async')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toBe('ok');
        done();
      });
  });

  it('get async show()', (done) => {
    const id = 'hj30a9834';
    request(app)
      .get(`/test/async/show/${id}`)
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
    const id = 'pea34a33';
    request(app)
      .put(`/test/:${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });

  it('delete destroy()', function(done) {
    const id = 'aeara34a33';
    request(app)
      .delete(`/test/:${id}`)
      .then((res) => {
        expect(res.status).toBe(200);
        done();
      });
  });
});
