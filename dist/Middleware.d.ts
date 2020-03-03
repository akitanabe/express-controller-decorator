import { RequestHandler } from 'express';
import MetadataCollection from './MetadataCollection';
export declare type MiddlewareMetadata = {
    name: string;
    handler: RequestHandler;
};
export declare const middlewareMetadata: MetadataCollection<MiddlewareMetadata>;
declare const Middleware: (middleware: RequestHandler) => MethodDecorator;
export default Middleware;
