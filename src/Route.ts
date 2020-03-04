/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, RequestHandler, Response } from 'express';
import { methodsMetadata, MethodsMetadata } from './Methods';
import { middlewareMetadata, MiddlewareMetadata } from './Middleware';
import Controller from './Controller';

type Metadata = {
  methods: MethodsMetadata[];
  middleware: MiddlewareMetadata[];
};

function createMiddleware(
  metadata: Metadata,
  actionName: string
): RequestHandler[] {
  return (
    metadata.middleware
      .filter(({ name }) => name === actionName)
      .map(({ handler }) => handler)
      // メソッドデコレータの実行は書かれた逆順になるので反転させる
      .reverse()
  );
}

function returnResponse(res: Response, val: unknown): void {
  if (val === null || val === undefined) {
    res.end();
    return;
  }

  res.send(val);
}

function createHandler(action: Function): RequestHandler {
  return function(req, res, next): void {
    const retval = action(req, res, next);

    if (retval instanceof Promise) {
      retval
        .then((promiseVal) => {
          returnResponse(res, promiseVal);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      returnResponse(res, retval);
    }
  };
}

export default function Route(basePath: string) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return function(fn: new () => Controller) {
    return class extends fn {
      constructor() {
        super();
      }

      private metadata: Metadata = {
        methods: methodsMetadata.get(fn.prototype),
        middleware: middlewareMetadata.get(fn.prototype),
      };

      get route(): Router {
        const route = Router();
        this.metadata.methods.forEach(
          ({ path: actionPath, name: actionName, method }) => {
            const action = this[actionName] as unknown;

            if (typeof action === 'function') {
              const path =
                '/' +
                [basePath, actionPath]
                  .map((path) => path.replace(/^\/*/, ''))
                  .join('/');

              const middlewares = createMiddleware(this.metadata, actionName);

              const handler = createHandler(action.bind(this));

              route[method](path, [...middlewares, handler]);
            }
          }
        );

        return route;
      }
    } as any;
  };
}
