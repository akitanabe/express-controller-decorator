/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router } from 'express';
import { methodsMetadata, MethodsMetadata } from './Methods';

export abstract class BaseController {
  readonly route!: Router;
}

type Metadata = {
  methods: MethodsMetadata[];
};
export function Controller(basePath: string) {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  return function(fn: new () => BaseController) {
    return class extends fn {
      constructor() {
        super();
      }

      private metadata: Metadata = {
        methods: methodsMetadata.get(fn.prototype),
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
