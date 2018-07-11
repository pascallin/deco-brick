"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = require("./middlewares/log");
const errorHandler = require("./middlewares/error-handler");
const bodyParser = require("koa-bodyparser");
const session = require('koa-session');
const cors = require('@koa/cors');
const index_1 = require("../src/index");
class App extends index_1.BrickServer {
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
        this.koa.keys = ['secret-shhh'];
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
//# sourceMappingURL=index.js.map