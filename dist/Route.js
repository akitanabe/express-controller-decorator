"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Methods_1 = require("./Methods");
const Middleware_1 = require("./Middleware");
function createMiddleware(metadata, actionName) {
    return (metadata.middleware
        .filter(({ name }) => name === actionName)
        .map(({ handler }) => handler)
        .reverse());
}
function returnResponse(res, val) {
    if (val === null || val === undefined) {
        res.end();
        return;
    }
    res.send(val);
}
function createHandler(action) {
    return function (req, res, next) {
        const retval = action(req, res, next);
        if (retval instanceof Promise) {
            retval
                .then((promiseVal) => {
                returnResponse(res, promiseVal);
            })
                .catch((err) => {
                next(err);
            });
        }
        else {
            returnResponse(res, retval);
        }
    };
}
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
                        const middlewares = createMiddleware(this.metadata, actionName);
                        const handler = createHandler(action.bind(this));
                        route[method](path, [...middlewares, handler]);
                    }
                });
                return route;
            }
        };
    };
}
exports.default = Route;
