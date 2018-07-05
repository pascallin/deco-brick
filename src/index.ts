import log = require('./middlewares/log');
import errorHandler = require('./middlewares/error-handler');

import bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('@koa/cors');

import Server from './cores/Server';

class App extends Server {
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

const app = new App();
app.start();