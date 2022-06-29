"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_router_1 = __importDefault(require("koa-router"));
const index_1 = require("./../middlewares/index");
const joi_1 = __importDefault(require("joi"));
const UserCtrl_1 = __importDefault(require("../controller/UserCtrl"));
const router = new koa_router_1.default({
    prefix: '/users'
});
// 添加用户验证
const saveRule = {
    name: joi_1.default.string().required(),
    age: joi_1.default.number()
};
// 移除用户
const removeRule = {
    id: joi_1.default.string().required()
};
router.get('/', UserCtrl_1.default.getUsers)
    .get('/save', (0, index_1.validator)(saveRule), UserCtrl_1.default.addUser)
    .del('/remove/:id', (0, index_1.validator)(removeRule), UserCtrl_1.default.removeUsers)
    .post('/update', UserCtrl_1.default.upadteUsers);
module.exports = router;
