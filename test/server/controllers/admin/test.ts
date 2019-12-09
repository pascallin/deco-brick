import { GET } from '../../../../src';
import { Context } from 'koa';

export class Controller {
    @GET('/admin/test')
    async test(ctx: Context) {
        return { message: 'here is admin' };
    }
}
