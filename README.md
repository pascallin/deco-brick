# brick
decoration style koa server with typescript
 
## notes

- use `koa-views` and `underscore` to render views
- use `koa-router` for routes
- the closest decorator in controller method must be one of `GET, POST, PUT, DEL`

## Usage

### BrickServer

brick server config as blow:
```
{
  port: 3000,                         // koa server port
  controllerPath: PATH_TO_CONTROLLER, // controller path
  viewPath: PATH_TO_VIEWS             // html files path
}
```

example
```
import { BrickServer } from 'brick';
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
import { BrickServer } from 'brick';

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
  - grpc 
  - etc...
- plugable controller