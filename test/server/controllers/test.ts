import { GET, POST, PUT, DEL, Validate, Render, BeforeMiddleware, AfterMiddleware } from '../../../src';
const Joi = require('joi');

import { m1, m2, m3, m4 } from '../middlewares/middleware';

class Controller {

  @BeforeMiddleware(m1())
  @BeforeMiddleware(m2())
  @AfterMiddleware(m3())
  @AfterMiddleware(m4())
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