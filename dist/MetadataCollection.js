"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class MetadataCollection {
    constructor(KEY) {
        this.KEY = KEY;
    }
    get(target, propKey) {
        const value = typeof propKey === 'string'
            ? Reflect.getMetadata(this.KEY, target, propKey)
            : Reflect.getMetadata(this.KEY, target);
        return Array.isArray(value) ? [...value] : [];
    }
    set(value, target, propKey) {
        if (typeof propKey === 'string') {
            Reflect.defineMetadata(this.KEY, [...value], target, propKey);
        }
        else {
            Reflect.defineMetadata(this.KEY, [...value], target);
        }
    }
    add(value, target, propKey) {
        this.set([...this.get(target, propKey), value], target, propKey);
    }
    clear(target, propKey) {
        if (typeof propKey === 'string') {
            Reflect.deleteMetadata(this.KEY, target, propKey);
        }
        else {
            Reflect.deleteMetadata(this.KEY, target);
        }
    }
}
exports.default = MetadataCollection;
