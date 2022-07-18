import Koa from "koa";
import Router from "koa-router";
import connectMongo from "./db";
import requireGlob from 'require-glob';
import json from "koa-json";
import onerror from "koa-onerror";
import logger from "koa-logger";
import Cors from 'koa2-cors';
import helmet from "koa-helmet";
import conditional from 'koa-conditional-get';
import etag from 'koa-etag';
import { normalizePort, bodyParser, renderViews, csrf, staticPath, rateLimit, session, jwt, staticCache } from "./utils/config";
const app = new Koa();

// link mongodb
connectMongo();

// error handler
onerror(app);

// middlewares
app
.use(helmet())
.use(rateLimit())
.use(csrf())
.use(staticPath())
.use(staticCache())
.use(session(app))
.use(jwt())
.use(conditional())
.use(etag())
.use(Cors())
.use(json())
.use(bodyParser())
.use(renderViews())
.use(logger());

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
