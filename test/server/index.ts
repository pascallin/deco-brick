import log = require('./middlewares/log');
import errorHandler = require('./middlewares/error-handler');
import path = require('path');
const session = require('koa-session');

import { BrickServer } from '../../src/index';

class App extends BrickServer {
  start() {
    // load cors
    this.useCors();
    // load session
    this.koa.keys = [ 'secret-shhh' ];
    this.koa.use(session(this.koa));
    this.koa.use(log());
    this.koa.use(errorHandler());

    super.start();
  }
}

const app = new App({
  port: 6001,
  controllerPath: [
    path.join(__dirname, '/controllers'),
    path.join(__dirname, '/controllers/admin')
  ],
  viewPath: path.join(__dirname, '/../views')
});

export default app;