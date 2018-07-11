declare class Controller {
    get(ctx: any): Promise<{
        message: string;
    }>;
    page(ctx: any): Promise<{
        name: string;
    }>;
    login(ctx: any): Promise<{
        status: string;
    }>;
}
export = Controller;
