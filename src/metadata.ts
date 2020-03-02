import 'reflect-metadata';

const CONTROLLER_KEY = Symbol('controller');

export function addMetaData<T>(value: T, target: unknown): void {
  if (typeof target !== 'object' || target === null) {
    return;
  }

  const list: T[] = Reflect.getMetadata(CONTROLLER_KEY, target) || [];

  Reflect.defineMetadata(CONTROLLER_KEY, [...list, value], target);
}

export function getMetadata<T>(target: unknown): T[] | undefined {
  if (typeof target !== 'object' || target === null) {
    return;
  }

  return Reflect.getMetadata(CONTROLLER_KEY, target);
}
