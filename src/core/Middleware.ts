import Joi = require('joi');
import _ = require('lodash');

export function validate (schema: object) {
  return async (ctx: any, next: any) => {
    try {
      if (schema) {
        const params = _.merge(ctx.params, ctx.request.query, ctx.request.body);
        ctx.params = await validatePromise(params, schema);
      }
    } catch (e) {
      ctx.throw(422, e.message);
    }
    await next();
  };
}

function validatePromise(value: any, schema: any) {
  return new Promise((resolve, reject) => {
      Joi.validate(value, schema, { stripUnknown: true }, (err, value) => {
          if (err) return reject(err);
          resolve(value);
      });
  });
}
