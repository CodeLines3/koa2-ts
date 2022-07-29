import Joi from "joi";
import { Context } from "koa";
import { ResponseData } from "@/utils/responseUtil";
import { decode, verify } from "jsonwebtoken";
import { secretKey } from "@/utils/config";
import { getToken } from "@/utils";
/**
 * @description request参数验证
 */
export function validator(schemas: Joi.PartialSchemaMap<any>) {
  return async (ctx: Context, next) => {
    let data: any;
    switch (ctx.method) {
      case "GET":
        data = ctx.query;
        break;
      case "POST":
        data = ctx.request.body;
        break;
      case "DELETE":
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

/**
 * @description 验证Token及刷新
 */
export function checkToken() {
  return async (ctx, next) => {
    if (ctx.header && ctx.header.authorization) {
      const [scheme, token] = ctx.header.authorization.split(" ");
      if (token) {
        try {
          // jwt.verify方法验证token是否有效
          verify(token, secretKey, {
            complete: true,
          });
        } catch (error) {
          // token过期 生成新的token
          const decoded = decode(token, { complete: true })!;
          const newToken = getToken(decoded);
          // 更新 header Authorization: token
          ctx.res.setHeader("Authorization", newToken);
        }
      }
    }
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401;
        ctx.body = ResponseData(401);
      } else {
        throw err;
      }
    });
  };
}
