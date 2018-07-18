import { Repository } from '../../index';
import { KnexClient } from '../libs/knex';

import { md5 } from '../libs/utils';

export = class Service extends Repository {
  constructor() {
    super({
      knexClient: KnexClient,
      name: 'user'
    });
  }
  async addUser(username: string, password: string): Promise<number | string> {
    const result = await this.upsert({
      username,
      password: md5(password)
    });
    return result.id;
  }
  async checkPassword(username: string, password: string): Promise<boolean> {
    const record = await this.knex().where({ username }).first();
    if (record.password == md5(password)) return true;
    return false;
  }
};