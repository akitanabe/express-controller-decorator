import { ControllerMetaData } from './Controller';
import { addMetaData } from './metadata';
type Methods = 'get' | 'post' | 'delete' | 'put';

function mapMethod(method: Methods): (path?: string) => MethodDecorator {
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

      addMetaData(controllerMetaData, target);
    };
  };
}

export const Get = mapMethod('get');
export const Post = mapMethod('post');
export const Delete = mapMethod('delete');
export const Put = mapMethod('put');
