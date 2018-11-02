import log = require('./middlewares/log');
import errorHandler = require('./middlewares/error-handler');

const session = require('koa-session');
const cors = require('@koa/cors');

import { BrickServer } from '..';

class App extends BrickServer {
  start() {
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
  controllerPath: [ __dirname + '/controllers', __dirname + '/controllers/admin' ],
  viewPath: __dirname + '/../../views'
});
app.start();