import 'reflect-metadata';
export declare function GET(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function POST(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function PUT(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function DEL(path: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function BeforeMiddleware(func: (ctx: any, next: Function) => any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function AfterMiddleware(func: (ctx: any, next: Function) => any): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Validate(schema: object): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
export declare function Render(view: string): (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
