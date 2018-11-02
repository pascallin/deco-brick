/// <reference types="knex" />
import { Transaction } from 'knex';
export interface IRepositoryData {
    id?: number | string;
    [propName: string]: any;
}
export interface Id {
    id: number | string;
}
export interface IComplexWhere {
    between?: string[];
}
export declare class Repository {
    protected knex: any;
    protected repo: any;
    constructor(tableName: string);
    sql(): any;
    transaction(): Promise<Transaction>;
    objSnakeToCamel(obj: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    upsert(data: IRepositoryData): Promise<Id>;
    delOne(id: number | string, soft?: boolean): Promise<number>;
    fetchOneById(id: number | string, softDelete?: boolean): Promise<IRepositoryData>;
    findOneByCondition(where?: object, softDelete?: boolean): Promise<{
        [key: string]: any;
    } | undefined>;
    findAllByCondition(where?: object, size?: number, page?: number, softDelete?: boolean): Promise<any>;
    findAllByConditionAndCount(where?: object, size?: number, page?: number, softDelete?: boolean, hook?: Function): Promise<{
        total: any;
        items: any;
    }>;
}
