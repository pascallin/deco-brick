declare const _default: {
    port: number;
    mysql: {
        client: string;
        connection: {
            host: string;
            port: number;
            user: string;
            password: string;
            database: string;
            charset: string;
            connectTimeout: number;
            stringifyObjects: boolean;
            multipleStatements: boolean;
            supportBigNumbers: boolean;
            connectionLimit: number;
        };
        pool: {
            min: number;
            max: number;
        };
        debug: boolean;
    };
} | {
    port: number;
    mysql: {
        client: string;
        connection: {
            host: string;
            port: number;
            user: string;
            password: string;
            database: string;
            charset: string;
            connectTimeout: number;
            stringifyObjects: boolean;
            multipleStatements: boolean;
            supportBigNumbers: boolean;
            connectionLimit: number;
        };
        pool: {
            min: number;
            max: number;
        };
        debug: boolean;
    };
};
export = _default;
