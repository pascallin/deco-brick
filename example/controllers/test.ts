import { GET, POST, PUT, DEL, Validate, Render } from '../../src/index';
import Joi = require('joi');

class Controller {
  @GET('/')
  async get (ctx: any) {
    return await Promise.resolve({ message: 'hello world' });
  }

  @Render('index')
  @GET('/view')
  async page (ctx: any) {
    return {  name: 'pascal' };
  }

  @Validate({
    username: Joi.string().required(),
    password: Joi.string().required(),
  })
  @POST('/login')
  async login (ctx: any) {
    return await Promise.resolve({ status: 'success' });
  }
}

export = Controller;