import 'reflect-metadata';
declare type Target = Record<string, any>;
export default class MetadataCollection<T> {
    constructor(KEY: symbol);
    KEY: symbol;
    get(target: Target, propKey?: string): T[];
    set(value: T[], target: Target, propKey?: string): void;
    add(value: T, target: Target, propKey?: string): void;
    clear(target: Target, propKey?: string): void;
}
export {};
