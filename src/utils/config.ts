import Koa from "koa";
import bodyparser from "koa-bodyparser";
import views from "koa-views";
import CSRF from "koa-csrf";
import jsonp from "koa-safe-jsonp";
import { RateLimit } from "koa2-ratelimit";
import mount from "koa-mount";
import koastatic from "koa-static";
import cacheSatic from "koa-static-cache";
import koasession from "koa-session";
import koajwt from "koa-jwt";
import json from "koa-json";
import logger from "koa-logger";
import Cors from "koa2-cors";
import helmet from "koa-helmet";
import conditional from "koa-conditional-get";
import etag from "koa-etag";
import { getWorkDir } from ".";
import { checkToken } from "@/middlewares";

export const secretKey = "shared-secret"; // 秘

/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(): number {
  const val = process.env.PORT || 3000;
  const port = parseInt(val + "", 10);
  if (isNaN(port)) {
    // named pipe
    return Number(val);
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return 3000;
}

/**
 * @description 添加中间件
 * @param app koa 实例
 */
export function useMiddlewares(app: Koa) {
  app.keys = ["some secret hurr"];
  const SESSION_SET = {
    maxAge: 86400000,
  };
  app
    .use(helmet())
    .use(
      RateLimit.middleware({
        interval: { min: 15 }, // 15 minutes = 15*60*1000
        max: 100, // limit each IP to 100 requests per interval
      })
    )
    .use(
      new CSRF({
        invalidSessionSecretMessage: "Invalid session secret",
        invalidTokenMessage: "Invalid CSRF token",
        invalidTokenStatusCode: 403,
      })
    )
    .use(mount("/sun", koastatic(getWorkDir("public"))))
    .use(
      cacheSatic(getWorkDir("public"), {
        maxAge: 365 * 24 * 60 * 60,
      })
    )
    .use(koasession(SESSION_SET, app))
    .use(checkToken())
    .use(
      koajwt({ secret: secretKey, key: "jwtdata" }).unless({
        path: [/^\/(users|sun|login|register)/, "/"],
      })
    )
    .use(conditional())
    .use(etag())
    .use(Cors())
    .use(json())
    .use(
      bodyparser({
        enableTypes: ["json", "form", "text"],
      })
    )
    .use(
      views(getWorkDir("views"), {
        extension: "ejs",
      })
    )
    .use(logger());
}

// middleware koa2-safe-jsonp
export function safeJsonp(app) {
  jsonp(app, {
    callback: "_callback", // default is 'callback'
    limit: 50, // max callback name string length, default is 512
  });
}
