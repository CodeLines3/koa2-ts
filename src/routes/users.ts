
import Router from "koa-router";
const router = new Router({
  prefix: '/users'
});

router.get('/', async (ctx, next) => {
  ctx.body = process.env
})

router.get('/bar', async (ctx, next) => {
  ctx.body = 'users-bar response'
})

module.exports = router
