import { GET, POST, PUT, DEL, Validate, Render } from '../../..';

export class Controller {
  @GET('/admin/test')
  async test(ctx: any) {
    return { message: 'here is admin' };
  }
}
