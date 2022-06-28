"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const router = new koa_router_1.default();
router.get('/', async (ctx, next) => {
    ctx.body = 'Hello Koa 232!';
});
router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string';
});
router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    };
});
module.exports = router;
