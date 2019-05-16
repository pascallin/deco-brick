# deco-brick

[English](https://github.com/pascallin/deco-brick/blob/master/README.md) | [中文](https://github.com/pascallin/deco-brick/blob/master/README_zh.md)

用Typescript写的基于koa的装饰器风格服务器

## Quick start

用脚手架快速创建项目

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

服务器可配置项有：

```
{
	port: 3000,                         // koa server port
	controllerPath: PATH_TO_CONTROLLER, // controller path, 										// string or array
	viewPath: PATH_TO_VIEWS             // html files path
}
```

简单的用例

```
import { BrickServer } from 'deco-brick';

const app = new BrickServer({
    port: 3000,
    controllerPath: __dirname + '/controllers',
    viewPath: __dirname + '/../../views'
});
app.start();

```

使用全局中间件自定义koa服务器

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

基于`koa-router`封装的装饰器路由，*注意，需要是最靠近controller函数里面最靠近的一个装饰器*

#### Validate

基于Joi封装的装饰器，*注意，ctx.params、ctx.request.query、ctx.request.body经过此装饰器后，都会合并到ctx.params，需要避免变量重名的情况出现*

#### Render

使用`koa-views`和`underscore` 渲染，渲染文件需要放到配置项里面的`viewPath`

#### BeforeMiddleware、AfterMiddleware

使用BeforeMiddleware和AfterMiddleware装饰器可以在路由生命周期里像koa一样嵌入特定的中间件

### Controller

一个简单的控制器示例

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