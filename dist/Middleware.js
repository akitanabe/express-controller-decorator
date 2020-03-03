"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MetadataCollection_1 = __importDefault(require("./MetadataCollection"));
const MIDDLEWARE_KEY = Symbol('middleware');
exports.middlewareMetadata = new MetadataCollection_1.default(MIDDLEWARE_KEY);
const Middleware = function (middleware) {
    return function (target, name) {
        if (typeof name !== 'string') {
            return;
        }
        exports.middlewareMetadata.add({ name, handler: middleware }, target);
    };
};
exports.default = Middleware;
