import { Method } from '../types/Method';

export interface Process {
  type: Method;
  path: string;
  validate: object;
  beforeMiddlewares?: Array<(ctx: any, next: Function) => any>;
  afterMiddlewares?: Array<(ctx: any, next: Function) => any>;
  target: any;
  action: string;
  view: string;
}