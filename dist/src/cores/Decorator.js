"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ProcessContainer_1 = __importDefault(require("./ProcessContainer"));
require("reflect-metadata");
const pathMetadataKey = Symbol('path');
const methodMetadataKey = Symbol('method');
var Method;
(function (Method) {
    Method["GET"] = "get";
    Method["POST"] = "post";
    Method["PUT"] = "put";
    Method["DEL"] = "delete";
})(Method || (Method = {}));
function implementProcess(method, path, target, propertyKey, descriptor) {
    Reflect.defineMetadata(methodMetadataKey, method, target, propertyKey);
    const container = ProcessContainer_1.default.getInstance();
    container.implementProcess({
        type: method,
        path,
        target: target.constructor,
        beforeMiddlewares: [],
        afterMiddlewares: [],
        action: propertyKey,
        validate: {},
        view: ''
    });
}
function GET(path) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
        implementProcess(Method.GET, path, target, propertyKey, descriptor);
    };
}
exports.GET = GET;
function POST(path) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
        implementProcess(Method.POST, path, target, propertyKey, descriptor);
    };
}
exports.POST = POST;
function PUT(path) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
        implementProcess(Method.PUT, path, target, propertyKey, descriptor);
    };
}
exports.PUT = PUT;
function DEL(path) {
    return function (target, propertyKey, descriptor) {
        Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
        implementProcess(Method.DEL, path, target, propertyKey, descriptor);
    };
}
exports.DEL = DEL;
function BeforeMiddleware(func) {
    return function (target, propertyKey, descriptor) {
        const container = ProcessContainer_1.default.getInstance();
        const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
        container.implementBeforeMiddleware(path, func);
    };
}
exports.BeforeMiddleware = BeforeMiddleware;
function AfterMiddleware(func) {
    return function (target, propertyKey, descriptor) {
        const container = ProcessContainer_1.default.getInstance();
        const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
        container.implementAfterMiddleware(path, func);
    };
}
exports.AfterMiddleware = AfterMiddleware;
function Validate(schema) {
    return function (target, propertyKey, descriptor) {
        const container = ProcessContainer_1.default.getInstance();
        const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
        const method = Reflect.getMetadata(methodMetadataKey, target, propertyKey);
        container.implementValidate(path, method, schema);
    };
}
exports.Validate = Validate;
function Render(view) {
    return function (target, propertyKey, descriptor) {
        const container = ProcessContainer_1.default.getInstance();
        const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
        const method = Reflect.getMetadata(methodMetadataKey, target, propertyKey);
        container.implementNeedRender(path, method, view);
    };
}
exports.Render = Render;
//# sourceMappingURL=Decorator.js.map