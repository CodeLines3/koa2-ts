import path from 'path';
import bodyparser from 'koa-bodyparser';
import views from 'koa-views';
import CSRF from 'koa-csrf';
import jsonp from 'koa-safe-jsonp';
import { RateLimit } from 'koa2-ratelimit';
import mount from 'koa-mount';
import koastatic from 'koa-static';
import cacheSatic from 'koa-static-cache';
import koasession from 'koa-session';
import koajwt from 'koa-jwt';

/**
 * Normalize a port into a number, string, or false.
 */
export function normalizePort(): number {
  const val = process.env.PORT || 3000;
  const port = parseInt(val + '', 10);

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

// middleware koa-bodyparser
export function bodyParser() {
  return bodyparser({
    enableTypes: ['json', 'form', 'text'],
  });
}

// middleware koa-views
export function renderViews() {
  return views(__dirname + '/views', {
    extension: 'ejs',
  });
}

// middleware koa-csrf
export function csrf() {
  return new CSRF({
    invalidSessionSecretMessage: 'Invalid session secret',
    invalidTokenMessage: 'Invalid CSRF token',
    invalidTokenStatusCode: 403,
  });
}
export const secretKey = 'shared-secret'; // 秘
// middleware koa-jwt
export function jwt() {
  return koajwt({ secret: secretKey, key: 'jwtdata' }).unless({
    path: [/^\/(users|sun|login)/],
  });
}

// middleware koa-session
export function session(app) {
  app.keys = ['some secret hurr'];
  const CONFIG = {
    maxAge: 86400000,
  };
  return koasession(CONFIG, app);
}

// middleware koa-static
export function staticPath() {
  const expose = koastatic(
    path.join(process.cwd(), 'public')
  );
  return mount('/sun', expose);
}

// middleware koa2-ratelimit
export function rateLimit() {
  return RateLimit.middleware({
    interval: { min: 15 }, // 15 minutes = 15*60*1000
    max: 100, // limit each IP to 100 requests per interval
  });
}

// middleware koa2-safe-jsonp
export function safeJsonp(app) {
  jsonp(app, {
    callback: '_callback', // default is 'callback'
    limit: 50, // max callback name string length, default is 512
  });
}

// middleware koa2-safe-jsonp
export function staticCache() {
  const caches = path.join(process.cwd(), 'public')
  return cacheSatic(caches, {
    maxAge: 365 * 24 * 60 * 60
  });
}