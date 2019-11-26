import koa from 'koa';
import Router = require('koa-router');
import views = require('koa-views');
import bodyParser = require('koa-bodyparser');

const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const cors = require('@koa/cors');

import ProcessConatiner from './ProcessContainer';
import { validate } from './Middleware';

export interface ServerOptions {
  port: number;
  controllerPath: string | Array<string>;
  viewPath?: string;
  controllers?: Array<any>;
}

export class BrickServer {
  protected koa: any = new koa();
  protected config: ServerOptions;
  constructor (config: ServerOptions) {
    this.config = config;
    // load body parse
    this.useBodyParse();
    // load views
    this.useView();
    this.implementControllers();
  }
  private implementControllers (ctrls?: Array<any>) {
    if (typeof this.config.controllerPath === 'string') {
      this.config.controllerPath = [ this.config.controllerPath ];
    }
    let ctrlsPath: string[] = [];
    for (const groupPath of this.config.controllerPath) {
      const ctrls = glob.sync(
        path.normalize(groupPath + '/*{.js,.ts}'))
        .filter((file: string) => {
          const dtsExtension = file.substring(file.length - 5, file.length);
          return ['.js', '.ts'].indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
        });
        ctrlsPath = ctrlsPath.concat(ctrls);
    }
    for (const p of ctrlsPath) {
      require(p);
    }
  }
  private loadRouter () {
    const container = ProcessConatiner.getInstance();
    const router = new Router();
    for (const process of container.getProcess()) {
      const { type, path, action, target, view } = process;

      // load before middlewares
      let beforeMiddlewares = process.beforeMiddlewares || [];
      beforeMiddlewares = beforeMiddlewares.reverse();

      // load after middlewares
      let afterMiddlewares = process.afterMiddlewares || [];
      afterMiddlewares = afterMiddlewares.reverse();

      // load router
      router[type](path,
        // setting validate
        validate(process.validate),
        // setting before middlewares
        ...beforeMiddlewares,
        // setting controller
        async (ctx: any, next: any) => {
          const data = await new target()[action](ctx);
          if (view) {
            await ctx.render(view, data);
          } else {
            ctx.body = data;
          }
          await next();
        },
        // setting after middlewares
        ...afterMiddlewares);
    }

    this.koa.use(router.routes()).use(router.allowedMethods());
  }
  useCors() {
    this.koa.use(cors());
  }
  useBodyParse() {
    this.koa.use(bodyParser({
      onerror: function (err: Error, ctx: any) {
        if (err) {
          ctx.throw(err);
        }
        ctx.throw('body parse error', 422);
      }
    }));
  }
  useView() {
    if (this.config.viewPath) {
      this.koa.use(views(this.config.viewPath, {map: {html: 'underscore'}}));
    }
  }
  start () {
    this.loadRouter();
    this.koa.listen(this.config.port);
    console.log(chalk.green(`deco-brcik server is listing ${this.config.port}`));
  }
}