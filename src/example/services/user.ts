import { Repository } from '../libs/KnexRepository';
import { md5 } from '../libs/utils';

export = class Service extends Repository {
  constructor() {
    super('user');
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