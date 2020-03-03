import MetadataCollection from './MetadataCollection';

export type Methods = 'get' | 'post' | 'delete' | 'put';

export type MethodsMetadata = {
  path: string;
  method: Methods;
  name: string;
};

const METHODS_KEY = Symbol('methods');
export const methodsMetadata = new MetadataCollection<MethodsMetadata>(
  METHODS_KEY
);

function mapMethod(method: Methods): (path?: string) => MethodDecorator {
  return function(path = '/') {
    return function(target, name): void {
      if (typeof name !== 'string') {
        return;
      }

      methodsMetadata.add({ path, method, name }, target);
    };
  };
}

export const Get = mapMethod('get');
export const Post = mapMethod('post');
export const Delete = mapMethod('delete');
export const Put = mapMethod('put');
