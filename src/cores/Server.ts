import _ from 'lodash';
import koa from 'koa';
import Router = require('koa-router');
import ProcessConatiner from './ProcessContainer';
import { validate } from './Middleware';

const config = require('../config');
const glob = require('glob');
const path = require('path');

import views = require('koa-views');

export interface ServerOptions {
  port: number;
  controllers: Array<any>;
}

export default class Server {
  protected koa: any = new koa();
  constructor (config?: ServerOptions) {
    // load views
    this.koa
      .use(views(__dirname + '/../../views', {map: {html: 'underscore'}}));
    this.implementControllers();
  }
  implementControllers (ctrls?: Array<any>) {
    const ctrlsPath = glob.sync(
      path.normalize(__dirname + '/../controllers/*{.js,.ts}'))
      .filter((file: string) => {
        const dtsExtension = file.substring(file.length - 5, file.length);
        return ['.js', '.ts'].indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
      });
    for (const p of ctrlsPath) {
      require(p);
    }
  }
  loadRouter () {
    const container = ProcessConatiner.getInstance();
    const router = new Router();
    for (const process of container.getProcess()) {
      const { type, path, action, target, view } = process;
      const beforeMiddlewares = process.beforeMiddlewares || [];
      const afterMiddlewares = process.afterMiddlewares || [];
      router[type](path,
        validate(process.validate),
        ...beforeMiddlewares,
        async (ctx: any) => {
          const data = await new target()[action](ctx);
          if (view) {
            await ctx.render(view, data);
          } else {
            ctx.body = data;
          }
        },
        ...afterMiddlewares);
    }
    this.koa.use(router.routes()).use(router.allowedMethods());
  }
  start () {
    this.loadRouter();
    this.koa.listen(config.port);
  }
}