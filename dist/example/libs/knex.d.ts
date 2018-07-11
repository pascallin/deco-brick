export declare class KnexClient {
    private client;
    constructor();
    knex(name: string): any;
    transaction(): void;
}
