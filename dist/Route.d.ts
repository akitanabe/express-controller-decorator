import Controller from './Controller';
export default function Route(basePath: string): (fn: new () => Controller) => any;
