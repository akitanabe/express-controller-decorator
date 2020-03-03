import MetadataCollection from './MetadataCollection';
export declare type Methods = 'get' | 'post' | 'delete' | 'put';
export declare type MethodsMetadata = {
    path: string;
    method: Methods;
    name: string;
};
export declare const methodsMetadata: MetadataCollection<MethodsMetadata>;
export declare const Get: (path?: string | undefined) => MethodDecorator;
export declare const Post: (path?: string | undefined) => MethodDecorator;
export declare const Delete: (path?: string | undefined) => MethodDecorator;
export declare const Put: (path?: string | undefined) => MethodDecorator;
