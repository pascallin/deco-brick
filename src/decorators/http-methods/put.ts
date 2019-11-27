import { pathMetadataKey } from '../../meta';
import { Method } from '../../types/Method';
import { implementProcess } from './utils';

export function PUT(path: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(pathMetadataKey, path, target, propertyKey);
    implementProcess(Method.PUT, path, target, propertyKey, descriptor);
  };
}