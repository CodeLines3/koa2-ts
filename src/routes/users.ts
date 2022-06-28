
import Router from "koa-router";
import { validator } from './../middlewares/index';
import Joi from 'joi';
import { UserCtrl } from "../controller/UserCtrl";
const router = new Router({
  prefix: '/users'
});
// 添加用户验证
const pushUserSchema = {
  username: Joi.string().required()
};

router.get('/', validator(pushUserSchema), UserCtrl.getUsers)
      .post('/', UserCtrl.addUser)

module.exports = router
