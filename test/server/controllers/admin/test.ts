import { GET, POST, PUT, DEL, Validate, Render } from '../../../../src';

export class Controller {
  @GET('/admin/test')
  async test(ctx: any) {
    return { message: 'here is admin' };
  }
}
