import ProcessConatiner from '../ProcessContainer';
import { pathMetadataKey } from '../meta';

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