import 'reflect-metadata';

type Target = Record<string, any>;

export default class MetadataCollection<T> {
  constructor(KEY: symbol) {
    this.KEY = KEY;
  }

  KEY: symbol;

  get(target: Target, propKey?: string): T[] {
    const value =
      typeof propKey === 'string'
        ? Reflect.getMetadata(this.KEY, target, propKey)
        : Reflect.getMetadata(this.KEY, target);

    return Array.isArray(value) ? [...value] : [];
  }

  set(value: T[], target: Target, propKey?: string): void {
    if (typeof propKey === 'string') {
      Reflect.defineMetadata(this.KEY, [...value], target, propKey);
    } else {
      Reflect.defineMetadata(this.KEY, [...value], target);
    }
  }

  add(value: T, target: Target, propKey?: string): void {
    this.set([...this.get(target, propKey), value], target, propKey);
  }

  clear(target: Target, propKey?: string): void {
    if (typeof propKey === 'string') {
      Reflect.deleteMetadata(this.KEY, target, propKey);
    } else {
      Reflect.deleteMetadata(this.KEY, target);
    }
  }
}
