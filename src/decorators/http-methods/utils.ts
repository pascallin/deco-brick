import { Method } from '../../types/Method';
import ProcessConatiner from '../../core/ProcessContainer';
import { methodMetadataKey } from '../../meta';

export function implementProcess(method: Method, path: string, target: any, propertyKey: string, descriptor: PropertyDescriptor) {
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