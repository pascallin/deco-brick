import { Process } from './Process';

export default class ProcessContaionr {
  private PorcessList: Array<Process> = [];
  private static instance: ProcessContaionr;
  static getInstance (): ProcessContaionr {
    if (!this.instance) {
      this.instance = new ProcessContaionr();
    }
    return this.instance;
  }
  implementProcess (process: Process): void {
    this.PorcessList.push(process);
  }
  getProcess (): Array<Process> {
    return this.PorcessList;
  }
  implementBeforeMiddleware(path: string, middleware: (ctx: any, next: Function) => any): void {
    for (const p of this.PorcessList) {
      if (p.path == path) {
        if (p.beforeMiddlewares) p.beforeMiddlewares.push(middleware);
      }
    }
  }
  implementAfterMiddleware(path: string, middleware: (ctx: any, next: Function) => any): void {
    for (const p of this.PorcessList) {
      if (p.path == path) {
        if (p.afterMiddlewares) p.afterMiddlewares.push(middleware);
      }
    }
  }
  implementValidate(path: string, method: string, schema: object): void {
    for (const p of this.PorcessList) {
      if (p.path == path && p.type == method) {
        p.validate = schema;
      }
    }
  }
  implementNeedRender(path: string, method: string, view: string): void {
    for (const p of this.PorcessList) {
      if (p.path == path && p.type == method) {
        p.view = view;
      }
    }
  }
}