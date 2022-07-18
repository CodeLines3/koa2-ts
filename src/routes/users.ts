import Router from "koa-router";
import Joi from 'joi';
import { validator } from './../middlewares/index';
import UserCtrl from "../controller/UserCtrl";
const router = new Router({
  prefix: '/users'
});
// 添加用户验证
const saveRule = {
  name: Joi.string().required(),
  age: Joi.number()
};
// 移除用户
const removeRule = {
  id: Joi.string().required()
};

router.get('/', UserCtrl.getUsers)
      .get('/save', validator(saveRule), UserCtrl.addUser)
      .del('/remove/:id', validator(removeRule), UserCtrl.removeUsers)
      .post('/update', UserCtrl.upadteUsers)

module.exports = router
