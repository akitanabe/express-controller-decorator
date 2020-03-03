import 'reflect-metadata';

type Target = Record<string, any>;

export default class MetadataCollection<T> {
  constructor(KEY: symbol) {
    this.KEY = KEY;
  }

  KEY: symbol;

  get(target: Target): T[] {
    const value = Reflect.getMetadata(this.KEY, target);

    return Array.isArray(value) ? [...value] : [];
  }

  set(value: T[], target: Target): void {
    Reflect.defineMetadata(this.KEY, [...value], target);
  }

  add(value: T, target: Target): void {
    this.set([...this.get(target), value], target);
  }

  clear(target: Target): void {
    Reflect.deleteMetadata(this.KEY, target);
  }
}
