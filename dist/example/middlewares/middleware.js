"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function m1() {
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('----------> m1 here');
            yield next();
        });
    };
}
exports.m1 = m1;
function m2() {
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('----------> m2 here');
            yield next();
        });
    };
}
exports.m2 = m2;
function m3() {
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('----------> m3 here');
            yield next();
        });
    };
}
exports.m3 = m3;
function m4() {
    return function (ctx, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('----------> m4 here');
            yield next();
        });
    };
}
exports.m4 = m4;
//# sourceMappingURL=middleware.js.map