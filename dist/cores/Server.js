"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const Router = require("koa-router");
const ProcessContainer_1 = __importDefault(require("./ProcessContainer"));
const Middleware_1 = require("./Middleware");
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const views = require("koa-views");
const bodyParser = require("koa-bodyparser");
class BrickServer {
    constructor(config) {
        this.koa = new koa_1.default();
        this.config = config;
        // load body parse
        this.koa.use(bodyParser({
            onerror: function (err, ctx) {
                if (err) {
                    ctx.throw(err);
                }
                ctx.throw('body parse error', 422);
            }
        }));
        // load views
        this.koa.use(views(config.viewPath, { map: { html: 'underscore' } }));
        this.implementControllers();
    }
    implementControllers(ctrls) {
        if (typeof this.config.controllerPath === 'string') {
            this.config.controllerPath = [this.config.controllerPath];
        }
        let ctrlsPath = [];
        for (const groupPath of this.config.controllerPath) {
            const ctrls = glob.sync(path.normalize(groupPath + '/*{.js,.ts}'))
                .filter((file) => {
                const dtsExtension = file.substring(file.length - 5, file.length);
                return ['.js', '.ts'].indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
            });
            ctrlsPath = ctrlsPath.concat(ctrls);
        }
        for (const p of ctrlsPath) {
            require(p);
        }
    }
    loadRouter() {
        const container = ProcessContainer_1.default.getInstance();
        const router = new Router();
        for (const process of container.getProcess()) {
            const { type, path, action, target, view } = process;
            let beforeMiddlewares = process.beforeMiddlewares || [];
            beforeMiddlewares = beforeMiddlewares.reverse();
            let afterMiddlewares = process.afterMiddlewares || [];
            afterMiddlewares = afterMiddlewares.reverse();
            router[type](path, Middleware_1.validate(process.validate), ...beforeMiddlewares, (ctx, next) => __awaiter(this, void 0, void 0, function* () {
                const data = yield new target()[action](ctx);
                if (view) {
                    yield ctx.render(view, data);
                }
                else {
                    ctx.body = data;
                }
                yield next();
            }), ...afterMiddlewares);
        }
        this.koa.use(router.routes()).use(router.allowedMethods());
    }
    start() {
        this.loadRouter();
        this.koa.listen(this.config.port);
        console.log(chalk.green(`deco-brcik server is listing ${this.config.port}`));
    }
}
exports.BrickServer = BrickServer;
//# sourceMappingURL=Server.js.map