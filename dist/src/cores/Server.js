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
const views = require("koa-views");
class BrickServer {
    constructor(config) {
        this.koa = new koa_1.default();
        this.config = config;
        // load views
        this.koa
            .use(views(config.viewPath, { map: { html: 'underscore' } }));
        this.implementControllers();
    }
    implementControllers(ctrls) {
        const ctrlsPath = glob.sync(path.normalize(this.config.controllerPath + '/*{.js,.ts}'))
            .filter((file) => {
            const dtsExtension = file.substring(file.length - 5, file.length);
            return ['.js', '.ts'].indexOf(path.extname(file)) !== -1 && dtsExtension !== '.d.ts';
        });
        for (const p of ctrlsPath) {
            require(p);
        }
    }
    loadRouter() {
        const container = ProcessContainer_1.default.getInstance();
        const router = new Router();
        for (const process of container.getProcess()) {
            const { type, path, action, target, view } = process;
            const beforeMiddlewares = process.beforeMiddlewares || [];
            const afterMiddlewares = process.afterMiddlewares || [];
            router[type](path, Middleware_1.validate(process.validate), ...beforeMiddlewares, (ctx) => __awaiter(this, void 0, void 0, function* () {
                const data = yield new target()[action](ctx);
                if (view) {
                    yield ctx.render(view, data);
                }
                else {
                    ctx.body = data;
                }
            }), ...afterMiddlewares);
        }
        this.koa.use(router.routes()).use(router.allowedMethods());
    }
    start() {
        this.loadRouter();
        this.koa.listen(this.config.port);
    }
}
exports.BrickServer = BrickServer;
//# sourceMappingURL=Server.js.map