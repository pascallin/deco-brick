export interface ServerOptions {
  port: number;
  controllerPath: string | Array<string>;
  viewPath?: string;
  controllers?: Array<any>;
}