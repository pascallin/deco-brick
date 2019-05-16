# deco-brick

[English](https://github.com/pascallin/deco-brick/blob/master/README.md) | [中文](https://github.com/pascallin/deco-brick/blob/master/README_zh.md)

decoration style koa server with typescript

## Quick start

There is a scaffold for deco-brick

```
npm i -g deco-brick-cli
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
	viewPath: PATH_TO_VIEWS             // optional, html files path
}
```

example:

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

The closest decorator in controller functions must be one of `GET, POST, PUT, DEL`.

Using `koa-router` for routes, you can use `koa-router` path style with `GET, POST, PUT, DEL` decorator.

#### Validate

The `Validate` decorator use `joi` to validate params. All `ctx.params`,`ctx.request.query` and `ctx.request.body` data are in `ctx.params` after validate.

#### Render

Using `koa-views` and `underscore` to render views in `viewPath` you set.

#### BeforeMiddleware、AfterMiddleware

Using `BeforeMiddleware` and `AfterMiddleware` decorator hook some middleware in route lifecycle like koa.

### Controller

A controler demo  demo as below:

```
import { GET, POST, PUT, DEL, Validate, Render, BeforeMiddleware, AfterMiddleware } from '../cores/Decorator';
import Joi = require('joi');
import { m1, m2, m3, m4 } from '../middlewares/middleware';

class Controller {
	@BeforeMiddleware(m1())
	@BeforeMiddleware(m2())
 	@AfterMiddleware(m3())
 	@AfterMiddleware(m4())  
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