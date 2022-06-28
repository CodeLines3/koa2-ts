
import Joi from 'joi';
import { Context } from 'koa';
import { ResponseData } from '../utils/responseUtil';
export function validator(schemas: Joi.ObjectSchema<any>) {
  return async function validateSchema(ctx: Context, next) {
    let data: any;
    switch (ctx.method) {
      case 'GET':
        data = ctx.request.query;
        break;
      case 'POST':
        data = ctx.request.body;
        break;
      default:
        break;
    }
    const { error } = schemas.validate(data);
    if (error) {
      ctx.body = ResponseData(400);
      return;
    }
    await next();
  };
}

