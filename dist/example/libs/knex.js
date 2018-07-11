"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
const config = require("../config");
class KnexClient {
    constructor() {
        this.client = knex(config.mysql);
    }
    knex(name) {
        return this.client(name);
    }
    transaction() {
        new Promise((resolve, reject) => {
            this.client.transaction((trx) => {
                resolve();
            }).catch(reject);
        });
    }
}
exports.KnexClient = KnexClient;
//# sourceMappingURL=knex.js.map