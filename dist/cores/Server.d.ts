export interface ServerOptions {
    port: number;
    controllerPath: string | Array<string>;
    viewPath?: string;
    controllers?: Array<any>;
}
export declare class BrickServer {
    protected koa: any;
    protected config: ServerOptions;
    constructor(config: ServerOptions);
    implementControllers(ctrls?: Array<any>): void;
    loadRouter(): void;
    start(): void;
}
