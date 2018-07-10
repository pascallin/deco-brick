export interface RepositoryData {
  id?: number | string;
  [ propName: string ]: any;
}

export interface Id {
  id: number | string;
}

export interface RepositoryParams {
  knexClient: any;
  name: string;
}

export class Repository {
  protected repo: string;
  protected client: any;
  constructor(params: RepositoryParams) {
    this.client = params.knexClient;
    this.repo = params.name;
  }
  knex() {
    return this.client.knex(this.repo);
  }
  async upsert(data: RepositoryData): Promise<Id> {
    if (data.id) {
      const record = await this.client.knex(this.repo).where({ id: data.id }).first();
      if (!record) throw new Error('record not found!');
      const result = await this.client.knex(this.repo).where({id: data.id}).update(data).returning('id');
      return { id: result };
    } else {
      const result = await this.client.knex(this.repo).insert(data).returning('id');
      return { id: result[0] };
    }
  }
  async delOne(id: number | string, soft = false): Promise<number> {
    if (soft) {
      return await this.client.knex(this.repo).where({ id }).update('is_deleted', 1);
    }
    return await this.client.knex(this.repo).where({ id }).del();
  }
  async fetchOneById(id: number | string): Promise<RepositoryData> {
    return await this.client.knex(this.repo).where({ id }).first();
  }
  async findOneByCondition(where?: object) {
    const sql = this.client.knex(this.repo);
    if (where) sql.where(where);
    return await sql.first();
  }
  async findAllByCondition(where?: object) {
    const sql = this.client.knex(this.repo);
    if (where) sql.where(where);
    return await sql;
  }
}