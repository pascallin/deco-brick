import log = require('./middlewares/log');
import errorHandler = require('./middlewares/error-handler');

import bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('@koa/cors');

import { BrickServer } from '..';

class App extends BrickServer {
  start() {
    // load body parse
    this.koa.use(bodyParser({
      onerror: function (err, ctx) {
        ctx.throw('body parse error', 422);
      }
    }));
    // load cors
    this.koa.use(cors());
    // load session
    this.koa.keys = [ 'secret-shhh' ];
    this.koa.use(session(this.koa));
    this.koa.use(log());
    this.koa.use(errorHandler());

    super.start();
  }
}

const app = new App({
  port: 3000,
  controllerPath: __dirname + '/controllers',
  viewPath: __dirname + '/views'
});
app.start();