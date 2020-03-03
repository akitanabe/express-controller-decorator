"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MetadataCollection_1 = __importDefault(require("./MetadataCollection"));
const METHODS_KEY = Symbol('methods');
exports.methodsMetadata = new MetadataCollection_1.default(METHODS_KEY);
function mapMethod(method) {
    return function (path = '/') {
        return function (target, name) {
            if (typeof name !== 'string') {
                return;
            }
            exports.methodsMetadata.add({ path, method, name }, target);
        };
    };
}
exports.Get = mapMethod('get');
exports.Post = mapMethod('post');
exports.Delete = mapMethod('delete');
exports.Put = mapMethod('put');
