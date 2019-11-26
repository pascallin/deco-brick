import ProcessConatiner from './ProcessContainer';
import 'reflect-metadata';
import { Method } from './Method';

const pathMetadataKey = Symbol('path');
const methodMetadataKey = Symbol('method');

function implementProcess(method: Method, path: string, target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata(methodMetadataKey, method, target, propertyKey);
  const container = ProcessConatiner.getInstance();
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

export function GET(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
    implementProcess(Method.GET, path, target, propertyKey, descriptor);
  };
}

export function POST(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
    implementProcess(Method.POST, path, target, propertyKey, descriptor);
  };
}

export function PUT(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
    implementProcess(Method.PUT, path, target, propertyKey, descriptor);
  };
}

export function DEL(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
    implementProcess(Method.DEL, path, target, propertyKey, descriptor);
  };
}

export function BeforeMiddleware(func: (ctx: any, next: Function) => any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const container = ProcessConatiner.getInstance();
    const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
    container.implementBeforeMiddleware(path, func);
  };
}

export function AfterMiddleware(func: (ctx: any, next: Function) => any) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const container = ProcessConatiner.getInstance();
    const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
    container.implementAfterMiddleware(path, func);
  };
}

export function Validate(schema: object) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const container = ProcessConatiner.getInstance();
    const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
    const method = Reflect.getMetadata(methodMetadataKey, target, propertyKey);
    container.implementValidate(path, method, schema);
  };
}

export function Render(view: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const container = ProcessConatiner.getInstance();
    const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
    const method = Reflect.getMetadata(methodMetadataKey, target, propertyKey);
    container.implementNeedRender(path, method, view);
  };
}