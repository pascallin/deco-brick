import ProcessConatiner from '../../core/ProcessContainer';
import { pathMetadataKey, methodMetadataKey } from '../../meta';

export function Validate(schema: object) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const container = ProcessConatiner.getInstance();
    const path = Reflect.getMetadata(pathMetadataKey, target, propertyKey);
    const method = Reflect.getMetadata(methodMetadataKey, target, propertyKey);
    container.implementValidate(path, method, schema);
  };
}