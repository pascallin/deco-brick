"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("./middlewares/log");
const errorHandler = require("./middlewares/error-handler");
const session = require('koa-session');
const cors = require('@koa/cors');
const __1 = require("..");
class App extends __1.BrickServer {
    start() {
        // load cors
        this.koa.use(cors());
        // load session
        this.koa.keys = ['secret-shhh'];
        this.koa.use(session(this.koa));
        this.koa.use(log());
        this.koa.use(errorHandler());
        super.start();
    }
}
const app = new App({
    port: 3000,
    controllerPath: [__dirname + '/controllers', __dirname + '/controllers/admin'],
    viewPath: __dirname + '/views'
});
app.start();
//# sourceMappingURL=index.js.map