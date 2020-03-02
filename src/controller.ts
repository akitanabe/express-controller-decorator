import 'reflect-metadata';
import { Router } from 'express';

export abstract class BaseController {
  readonly route!: Router;
}

const CONTROLLER_KEY = Symbol('controller');

type ControllerMetaData = {
  path: string;
  method: 'get' | 'post' | 'put' | 'delete';
  name: string;
};

function addMetaData<T>(value: T, target: unknown, key: symbol): void {
  if (typeof target !== 'object' || target === null) {
    return;
  }

  const list: T[] = Reflect.getMetadata(key, target) || [];

  Reflect.defineMetadata(key, [...list, value], target);
}

export function Controller(basePath: string) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return function(fn: new () => BaseController) {
    return class extends fn {
      constructor() {
        super();
      }

      private controller: ControllerMetaData[] =
        Reflect.getMetadata(CONTROLLER_KEY, fn.prototype) || [];

      get route(): Router {
        const route = Router();
        this.controller.forEach(
          ({ path: actionPath, name: actionName, method }) => {
            const action = this[actionName] as unknown;

            if (typeof action === 'function') {
              const path =
                '/' +
                [basePath, actionPath]
                  .map((path) => path.replace(/^\/*/, ''))
                  .join('/');

              route[method](path, function(req, res) {
                const retval = action(req, res);

                if (typeof retval === 'string') {
                  res.send(retval);
                } else if (typeof retval === 'object') {
                  res.json(retval);
                }

                res.end();
              });
            }
          }
        );

        return route;
      }
    } as any;
  };
}

function mapMethod(
  method: ControllerMetaData['method']
): (path?: string) => MethodDecorator {
  return function(path = '/') {
    return function(target, name, descripter): void {
      if (typeof name !== 'string') {
        return;
      }

      const controllerMetaData: ControllerMetaData = {
        path,
        method,
        name,
      };

      addMetaData(controllerMetaData, target, CONTROLLER_KEY);
    };
  };
}

export const Get = mapMethod('get');
