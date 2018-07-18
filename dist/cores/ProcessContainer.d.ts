export default class ProcessContaionr {
    private PorcessList;
    private static instance;
    static getInstance(): ProcessContaionr;
    implementProcess(process: Process): void;
    getProcess(): Array<Process>;
    implementBeforeMiddleware(path: string, middleware: (ctx: any, next: Function) => any): void;
    implementAfterMiddleware(path: string, middleware: (ctx: any, next: Function) => any): void;
    implementValidate(path: string, method: string, schema: object): void;
    implementNeedRender(path: string, method: string, view: string): void;
}
