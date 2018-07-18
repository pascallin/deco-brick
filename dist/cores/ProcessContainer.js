"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProcessContaionr {
    constructor() {
        this.PorcessList = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProcessContaionr();
        }
        return this.instance;
    }
    implementProcess(process) {
        this.PorcessList.push(process);
    }
    getProcess() {
        return this.PorcessList;
    }
    implementBeforeMiddleware(path, middleware) {
        for (const p of this.PorcessList) {
            if (p.path == path) {
                if (p.beforeMiddlewares)
                    p.beforeMiddlewares.push(middleware);
            }
        }
    }
    implementAfterMiddleware(path, middleware) {
        for (const p of this.PorcessList) {
            if (p.path == path) {
                if (p.afterMiddlewares)
                    p.afterMiddlewares.push(middleware);
            }
        }
    }
    implementValidate(path, method, schema) {
        for (const p of this.PorcessList) {
            if (p.path == path && p.type == method) {
                p.validate = schema;
            }
        }
    }
    implementNeedRender(path, method, view) {
        for (const p of this.PorcessList) {
            if (p.path == path && p.type == method) {
                p.view = view;
            }
        }
    }
}
exports.default = ProcessContaionr;
//# sourceMappingURL=ProcessContainer.js.map