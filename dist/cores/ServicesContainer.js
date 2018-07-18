"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ServiceContaionr {
    constructor() {
        this.ServiceList = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ServiceContaionr();
        }
        return this.instance;
    }
}
exports.default = ServiceContaionr;
//# sourceMappingURL=ServicesContainer.js.map