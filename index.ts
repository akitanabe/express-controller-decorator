import { Router } from 'express';

abstract class Controller {
  route!: Router;
}

export function controller(basePath: string) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return function(fn: new () => Controller) {
    return class extends fn {
      constructor() {
        super();
      }

      get route(): Router {
        return Router();
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any;
  };
}

const get: MethodDecorator = function(target, prop, dsc) {};

const middleware: MethodDecorator = function(target, prop, dsc) {};

@controller('/test')
class TestController extends Controller {
  @get
  index() {
    return {};
  }
}

new TestController().route;
