import { Transaction } from 'knex';
import knex from 'knex';
export interface IRepositoryData {
  id?: number | string;
  [ propName: string ]: any;
}
export interface Id {
  id: number | string;
}
export interface IComplexWhere {
  between?: string[];
}

import _ from 'lodash';
function objCamelToSnake(obj: { [key: string]: any }) {
  const data: { [key: string]: any } = {};
  for (const i in obj) {
    data[_.snakeCase(i)] = obj[i];
  }
  return data;
}
function objSnakeToCamel(obj: { [key: string]: any }) {
  const data: { [key: string]: any } = {};
  for (const i in obj) {
    data[_.camelCase(i)] = obj[i];
  }
  return data;
}

import config from '../config';

export class Repository {
  protected knex: any;
  protected repo: any;
  constructor(tableName: string) {
    this.knex = knex(config.mysql);
    this.repo = tableName;
  }
  sql() {
    return this.knex.from(this.repo);
  }
  transaction(): Promise<Transaction> {
    const self = this;
    return new Promise((resolve, reject) => {
      self.knex.transaction.call(self.knex, (trx: Transaction) => {
        resolve(trx);
      }).catch(reject);
    });
  }
  objSnakeToCamel(obj: { [key: string]: any }) {
    const data: { [key: string]: any } = {};
    for (const i in obj) {
      data[_.camelCase(i)] = obj[i];
    }
    return data;
  }
  async upsert(data: IRepositoryData): Promise<Id> {
    data = objCamelToSnake(data);
    if (data.id) {
      const record = await this.sql().where({ id: data.id }).first();
      if (!record) {
        throw new Error('record not found!');
    }
      const result = await this.sql().where({id: data.id}).update(data).returning('id');
      return { id: result };
    } else {
      const result = await this.sql().insert(data).returning('id');
      return { id: result[0] };
    }
  }
  async delOne(id: number | string, soft = false): Promise<number> {
    if (soft) {
      return await this.sql().where({ id }).update('delete_at', new Date());
    }
    return await this.sql().where({ id }).del();
  }
  async fetchOneById(id: number | string, softDelete: boolean = false): Promise<IRepositoryData> {
    const sql =  this.sql().where({ id }).first();
    if (softDelete) { sql.whereNull('delete_at'); }
    const record = await sql;
    return record ? objSnakeToCamel(record) : record;
  }
  async findOneByCondition(where?: object, softDelete: boolean = false) {
    const sql = this.sql();
    if (where) { sql.where(objCamelToSnake(where)); }
    if (softDelete) { sql.whereNull('delete_at'); }
    const record = await sql.first();
    return record ? objSnakeToCamel(record) : undefined;
  }
  async findAllByCondition(where?: object, size: number = 10, page?: number, softDelete: boolean = false) {
    const sql = this.sql();
    if (where) { sql.where(objCamelToSnake(where)); }
    if (size) { sql.limit(size); }
    if (page) { sql.offset((page - 1) * size); }
    if (softDelete) { sql.whereNull('delete_at'); }
    const records = await sql;
    return records.length > 0 ?
      records.map((v: {[key: string]: any}) => objSnakeToCamel(v))
      : records;
  }
  async findAllByConditionAndCount(where?: object, size: number = 10, page?: number, softDelete: boolean = false, hook?: Function) {
    let sql = this.sql();
    if (where) { sql.where(objCamelToSnake(where)); }
    if (size) { sql.limit(size); }
    if (page) { sql.offset((page - 1) * size); }
    if (softDelete) { sql.whereNull('delete_at'); }

    if (hook) { sql = hook(sql); }

    const countSql = sql.clone();
    const records = await sql;
    const total = await countSql.count('*');
    return {
      total: total[0] ? total[0]['count(*)'] : 0,
      items: records.length > 0 ? records.map((v: {[key: string]: any}) => objSnakeToCamel(v)) : records
    };
  }
}
