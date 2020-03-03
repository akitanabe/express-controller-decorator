import { RequestHandler } from 'express';
import MetadataCollection from './MetadataCollection';

const MIDDLEWARE_KEY = Symbol('middleware');
export type MiddlewareMetadata = {
  name: string;
  handler: RequestHandler;
};

export const middlewareMetadata = new MetadataCollection<MiddlewareMetadata>(
  MIDDLEWARE_KEY
);

export const Middleware: (
  middleware: RequestHandler
) => MethodDecorator = function(middleware) {
  return function(target, name): void {
    if (typeof name !== 'string') {
      return;
    }

    middlewareMetadata.add({ name, handler: middleware }, target);
  };
};
