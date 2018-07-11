export interface RepositoryData {
    id?: number | string;
    [propName: string]: any;
}
export interface Id {
    id: number | string;
}
export declare class Repository {
    protected repo: string;
    constructor(name: string);
    knex(): any;
    upsert(data: RepositoryData): Promise<Id>;
    delOne(id: number | string, soft?: boolean): Promise<number>;
    fetchOneById(id: number | string): Promise<RepositoryData>;
    findOneByCondition(where?: object): Promise<any>;
    findAllByCondition(where?: object): Promise<any>;
}
