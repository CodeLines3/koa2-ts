import Router from "koa-router";
import Joi from 'joi';
import { validator } from '@/middlewares/index';
import UserCtrl from "@/controller/UserCtrl";
const router = new Router({
  prefix: '/users'
});
// 添加用户验证
const saveRule = {
  name: Joi.string().required(),
  password: Joi.string().required()
};
// 移除用户
const removeRule = {
  id: Joi.string().required()
};

router.get('/', UserCtrl.getUsers)
      .get('/register', validator(saveRule), UserCtrl.register)
      .del('/remove/:id', validator(removeRule), UserCtrl.removeUsers)
      .post('/update', UserCtrl.upadteUsers)

module.exports = router
