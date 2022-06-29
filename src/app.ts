import Koa from "koa";
import bodyparser from "koa-bodyparser";
import Router from "koa-router";
import connectMongo from "./db";
import { normalizePort } from "./utils/config";
import requireGlob from 'require-glob';
import views from "koa-views";
import json from "koa-json";
import onerror from "koa-onerror";
import logger from "koa-logger";
import KoaStatic from "koa-static";
import Cors from 'koa2-cors';
const app = new Koa();

// link mongodb
connectMongo();

// error handler
onerror(app);
// middlewares
app.use(KoaStatic(process.cwd() + "/public"))
.use(Cors())
.use(json())
.use(logger())
.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
).use(
  views(__dirname + "/views", {
    extension: "ejs",
  })
);
requireGlob(['./routes/**/*']).then(function (modules) {
  Object.values(modules).forEach(m => {
    // 如果是路由就进行注册
    if (m instanceof Router) {
      app.use(m.routes())
         .use(m.allowedMethods());
    }
  });
});
/**
 * Get port from environment and store in Express.
 * app.set('port', port);
 */
const port: number = normalizePort(process.env.PORT || '3000');

app.listen(port, function() {
  console.log('listening  port：' + port)
});
