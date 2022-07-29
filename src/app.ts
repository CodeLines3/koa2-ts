import 'module-alias/register'
import Koa from "koa";
import Router from "koa-router";
import connectMongo from "@/db";
import requireGlob from 'require-glob';
import onerror from "koa-onerror";
import { normalizePort, useMiddlewares } from "@/utils/config";

const app = new Koa();

// link mongodb
connectMongo();

// error handler
onerror(app);

// middlewares
useMiddlewares(app);

// routers 
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
const port: number = normalizePort();
app.listen(port, function() {
  console.log('listening  port：' + port)
});
