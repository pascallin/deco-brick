import { KnexClient } from '../deps/knex';
const client = new KnexClient();

export interface RepositoryData {
  id?: number | string;
  [ propName: string ]: any;
}

export interface Id {
  id: number | string;
}

export class Repository {
  protected repo: string;
  constructor(name: string) {
    this.repo = name;
  }
  knex() {
    return client.knex(this.repo);
  }
  async upsert(data: RepositoryData): Promise<Id> {
    if (data.id) {
      const record = await client.knex(this.repo).where({ id: data.id }).first();
      if (!record) throw new Error('record not found!');
      const result = await client.knex(this.repo).where({id: data.id}).update(data).returning('id');
      return { id: result };
    } else {
      const result = await client.knex(this.repo).insert(data).returning('id');
      return { id: result[0] };
    }
  }
  async delOne(id: number | string, soft = false): Promise<number> {
    if (soft) {
      return await client.knex(this.repo).where({ id }).update('is_deleted', 1);
    }
    return await client.knex(this.repo).where({ id }).del();
  }
  async fetchOneById(id: number | string): Promise<RepositoryData> {
    return await client.knex(this.repo).where({ id }).first();
  }
  async findOneByCondition(where?: object) {
    const sql = client.knex(this.repo);
    if (where) sql.where(where);
    return await sql.first();
  }
  async findAllByCondition(where?: object) {
    const sql = client.knex(this.repo);
    if (where) sql.where(where);
    return await sql;
  }
}