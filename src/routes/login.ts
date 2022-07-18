import Router from "koa-router";
import { Context } from "koa";
import jwtoken from "jsonwebtoken";
import { secretKey } from "../utils/config";
import { ResponseData } from "../utils/responseUtil";
const router = new Router();

const expiresIn = Date.now() +  1000 * 60 * 60 * 24 * 7; // token 过期时间

router.post("/login", (ctx: Context) => {
  const user = ctx.request.body;
  if (user && user.name) {
    const tokenInfo = {
      exp: expiresIn,
      ...user
    };
    const token = jwtoken.sign(tokenInfo, secretKey);
    ctx.body = {
      user: user.name,
      code: 1,
    };
    ctx.body = ResponseData(403, token);
  } else {
    ctx.body = ResponseData(403);
  }
});
module.exports = router

