
import Router from "koa-router";
const router = new Router();

router.get('/', async (ctx) => {
        ctx.body = 'Hello Koa 232!'
      })
      .get('/json', async (ctx) => {
        ctx.body = {
          title: 'koa2 json'
        }
      });

module.exports = router
