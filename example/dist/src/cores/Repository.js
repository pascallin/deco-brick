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
const knex_1 = require("../deps/knex");
const client = new knex_1.KnexClient();
class Repository {
    constructor(name) {
        this.repo = name;
    }
    knex() {
        return client.knex(this.repo);
    }
    upsert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.id) {
                const record = yield client.knex(this.repo).where({ id: data.id }).first();
                if (!record)
                    throw new Error('record not found!');
                const result = yield client.knex(this.repo).where({ id: data.id }).update(data).returning('id');
                return { id: result };
            }
            else {
                const result = yield client.knex(this.repo).insert(data).returning('id');
                return { id: result[0] };
            }
        });
    }
    delOne(id, soft = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (soft) {
                return yield client.knex(this.repo).where({ id }).update('is_deleted', 1);
            }
            return yield client.knex(this.repo).where({ id }).del();
        });
    }
    fetchOneById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield client.knex(this.repo).where({ id }).first();
        });
    }
    findOneByCondition(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = client.knex(this.repo);
            if (where)
                sql.where(where);
            return yield sql.first();
        });
    }
    findAllByCondition(where) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = client.knex(this.repo);
            if (where)
                sql.where(where);
            return yield sql;
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map