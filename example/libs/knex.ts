import knex = require('knex');
import config = require('../config');

export class KnexClient {
  private client: any;
  constructor() {
    this.client = knex(config.mysql);
  }
  knex(name: string) {
    return this.client(name);
  }
  transaction() {
    new Promise((resolve, reject) => {
      this.client.transaction((trx: any) => {
        resolve();
      }).catch(reject);
    });
  }
}