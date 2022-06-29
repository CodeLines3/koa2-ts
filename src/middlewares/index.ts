
import Joi from 'joi';
import { Context } from 'koa';
import { ResponseData } from '../utils/responseUtil';
export function validator(schemas: Joi.PartialSchemaMap<any>) {
  return async function validateSchema(ctx: Context, next) {
    let data: any;
    switch (ctx.method) {
      case 'GET':
        data = ctx.query;
        break;
      case 'POST':
        data = ctx.request.body;
        break;
      case 'DELETE':
        data = ctx.params;
        break;
      default:
        break;
    }
    const { error } = Joi.object(schemas).validate(data);
    if (error) {
      ctx.body = ResponseData(400);
      return;
    }
    await next();
  };
}

