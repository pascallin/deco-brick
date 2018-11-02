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
const knex_1 = __importDefault(require("knex"));
const lodash_1 = __importDefault(require("lodash"));
function objCamelToSnake(obj) {
    const data = {};
    for (const i in obj) {
        data[lodash_1.default.snakeCase(i)] = obj[i];
    }
    return data;
}
function objSnakeToCamel(obj) {
    const data = {};
    for (const i in obj) {
        data[lodash_1.default.camelCase(i)] = obj[i];
    }
    return data;
}
const config_1 = __importDefault(require("../config"));
class Repository {
    constructor(tableName) {
        this.knex = knex_1.default(config_1.default.mysql);
        this.repo = tableName;
    }
    sql() {
        return this.knex.from(this.repo);
    }
    transaction() {
        const self = this;
        return new Promise((resolve, reject) => {
            self.knex.transaction.call(self.knex, (trx) => {
                resolve(trx);
            }).catch(reject);
        });
    }
    objSnakeToCamel(obj) {
        const data = {};
        for (const i in obj) {
            data[lodash_1.default.camelCase(i)] = obj[i];
        }
        return data;
    }
    upsert(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data = objCamelToSnake(data);
            if (data.id) {
                const record = yield this.sql().where({ id: data.id }).first();
                if (!record) {
                    throw new Error('record not found!');
                }
                const result = yield this.sql().where({ id: data.id }).update(data).returning('id');
                return { id: result };
            }
            else {
                const result = yield this.sql().insert(data).returning('id');
                return { id: result[0] };
            }
        });
    }
    delOne(id, soft = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (soft) {
                return yield this.sql().where({ id }).update('delete_at', new Date());
            }
            return yield this.sql().where({ id }).del();
        });
    }
    fetchOneById(id, softDelete = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = this.sql().where({ id }).first();
            if (softDelete) {
                sql.whereNull('delete_at');
            }
            const record = yield sql;
            return record ? objSnakeToCamel(record) : record;
        });
    }
    findOneByCondition(where, softDelete = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = this.sql();
            if (where) {
                sql.where(objCamelToSnake(where));
            }
            if (softDelete) {
                sql.whereNull('delete_at');
            }
            const record = yield sql.first();
            return record ? objSnakeToCamel(record) : undefined;
        });
    }
    findAllByCondition(where, size = 10, page, softDelete = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const sql = this.sql();
            if (where) {
                sql.where(objCamelToSnake(where));
            }
            if (size) {
                sql.limit(size);
            }
            if (page) {
                sql.offset((page - 1) * size);
            }
            if (softDelete) {
                sql.whereNull('delete_at');
            }
            const records = yield sql;
            return records.length > 0 ?
                records.map((v) => objSnakeToCamel(v))
                : records;
        });
    }
    findAllByConditionAndCount(where, size = 10, page, softDelete = false, hook) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = this.sql();
            if (where) {
                sql.where(objCamelToSnake(where));
            }
            if (size) {
                sql.limit(size);
            }
            if (page) {
                sql.offset((page - 1) * size);
            }
            if (softDelete) {
                sql.whereNull('delete_at');
            }
            if (hook) {
                sql = hook(sql);
            }
            const countSql = sql.clone();
            const records = yield sql;
            const total = yield countSql.count('*');
            return {
                total: total[0] ? total[0]['count(*)'] : 0,
                items: records.length > 0 ? records.map((v) => objSnakeToCamel(v)) : records
            };
        });
    }
}
exports.Repository = Repository;
//# sourceMappingURL=KnexRepository.js.map