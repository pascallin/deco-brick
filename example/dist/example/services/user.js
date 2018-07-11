"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const index_1 = require("../../src/index");
const knex_1 = require("../libs/knex");
const utils_1 = require("../libs/utils");
module.exports = class Service extends index_1.Repository {
    constructor() {
        super({
            knexClient: knex_1.KnexClient,
            name: 'user'
        });
    }
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.upsert({
                username,
                password: utils_1.md5(password)
            });
            return result.id;
        });
    }
    checkPassword(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const record = yield this.knex().where({ username }).first();
            if (record.password == utils_1.md5(password))
                return true;
            return false;
        });
    }
};
//# sourceMappingURL=user.js.map