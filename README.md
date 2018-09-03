# deco-brick
decoration style koa server with typescript

## Quick start

There is a scaffold for deco-brick
```
npm i -g deco-brick-cli
deco-brick-cli init <project>
cd <project> && npm i
tsc
node <project>/dist/index.js
```

## Usage

### BrickServer

brick server config as blow:
```
{
  port: 3000,                         // koa server port
  controllerPath: PATH_TO_CONTROLLER, // controller path, string or array
  viewPath: PATH_TO_VIEWS             // html files path
}
```

example
```
import { BrickServer } from 'deco-brick';
const app = new BrickServer({
  port: 3000,
  controllerPath: __dirname + '/controllers',
  viewPath: __dirname + '/../../views'
});
app.start();
```

custom your own koa server
```
import log = require('./middlewares/log');
import errorHandler = require('./middlewares/error-handler');
import bodyParser = require('koa-bodyparser');
const session = require('koa-session');
const cors = require('@koa/cors');
import { BrickServer } from 'deco-brick';

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
  viewPath: __dirname + '/../../views'
});
app.start();
```

### Decorators

#### GET, POST, PUT, DEL
The closest decorator in controller method must be one of `GET, POST, PUT, DEL`.
Using `koa-router` for routes, you can use `koa-router` path style with `GET, POST, PUT, DEL` decorator.

#### Validate
The `Validate` decorator use `joi` to validate params. All `ctx.params`,`ctx.request.query` and `ctx.request.body` data are in `ctx.params` after validate.

#### Render
Using `koa-views` and `underscore` to render views in `viewPath` you set.

### Controller
A controler demo as below:
```
import { GET, POST, PUT, DEL, Validate, Render } from '../cores/Decorator';
import Joi = require('joi');

class Controller {
  @GET('/')
  async get (ctx: any) {
    return await Promise.resolve({ message: 'hello world' });
  }

  @Render('index')
  @GET('/view')
  async page (ctx: any) {
    return {  name: 'pascal' };
  }

  @Validate({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
  @POST('/login')
  async login (ctx: any) {
    return await Promise.resolve({ status: 'success' });
  }
}

export = Controller;
```

## What Next?
- convinent services
  - repository
  - etc...
- plugable controller