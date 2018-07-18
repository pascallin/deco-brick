"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const __1 = require("../..");
const Joi = require("joi");
class Controller {
    get(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve({ message: 'hello world' });
        });
    }
    page(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return { name: 'pascal' };
        });
    }
    login(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Promise.resolve({ status: 'success' });
        });
    }
}
__decorate([
    __1.GET('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Controller.prototype, "get", null);
__decorate([
    __1.Render('index'),
    __1.GET('/view'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Controller.prototype, "page", null);
__decorate([
    __1.Validate({
        username: Joi.string().required(),
        password: Joi.string().required(),
    }),
    __1.POST('/login'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Controller.prototype, "login", null);
module.exports = Controller;
//# sourceMappingURL=test.js.map