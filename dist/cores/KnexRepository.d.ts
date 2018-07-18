export interface RepositoryData {
    id?: number | string;
    [propName: string]: any;
}
export interface Id {
    id: number | string;
}
export interface RepositoryParams {
    knexClient: any;
    name: string;
}
export declare class Repository {
    protected repo: string;
    protected client: any;
    constructor(params: RepositoryParams);
    knex(): any;
    upsert(data: RepositoryData): Promise<Id>;
    delOne(id: number | string, soft?: boolean): Promise<number>;
    fetchOneById(id: number | string): Promise<RepositoryData>;
    findOneByCondition(where?: object): Promise<any>;
    findAllByCondition(where?: object): Promise<any>;
}
