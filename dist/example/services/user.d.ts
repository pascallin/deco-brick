declare const _default: {
    new (): {
        addUser(username: string, password: string): Promise<string | number>;
        checkPassword(username: string, password: string): Promise<boolean>;
    };
};
export = _default;
