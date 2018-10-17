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
const Joi = require("joi");
const _ = require("lodash");
function validate(schema) {
    return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (schema) {
                const params = _.merge(ctx.params, ctx.request.query, ctx.request.body);
                ctx.params = yield validatePromise(params, schema);
            }
        }
        catch (e) {
            ctx.status = 400;
            ctx.throw(e.message);
        }
        yield next();
    });
}
exports.validate = validate;
function validatePromise(value, schema) {
    return new Promise((resolve, reject) => {
        Joi.validate(value, schema, { stripUnknown: true }, (err, value) => {
            if (err)
                return reject(err);
            resolve(value);
        });
    });
}
//# sourceMappingURL=Middleware.js.map