"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Methods_1 = require("./Methods");
const Middleware_1 = require("./Middleware");
function Route(basePath) {
    return function (fn) {
        return class extends fn {
            constructor() {
                super();
                this.metadata = {
                    methods: Methods_1.methodsMetadata.get(fn.prototype),
                    middleware: Middleware_1.middlewareMetadata.get(fn.prototype),
                };
            }
            get route() {
                const route = express_1.Router();
                this.metadata.methods.forEach(({ path: actionPath, name: actionName, method }) => {
                    const action = this[actionName];
                    if (typeof action === 'function') {
                        const path = '/' +
                            [basePath, actionPath]
                                .map((path) => path.replace(/^\/*/, ''))
                                .join('/');
                        const middlewares = this.metadata.middleware
                            .filter(({ name }) => name === actionName)
                            .map(({ handler }) => handler)
                            .reverse();
                        const handler = function (req, res) {
                            const retval = action(req, res);
                            if (typeof retval === 'string') {
                                res.send(retval);
                            }
                            else if (typeof retval === 'object') {
                                res.json(retval);
                            }
                            res.end();
                        };
                        route[method](path, [...middlewares, handler]);
                    }
                });
                return route;
            }
        };
    };
}
exports.default = Route;
