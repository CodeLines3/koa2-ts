
import Router from "koa-router";
import { validator } from './../middlewares/index';
import Joi from 'joi';
import { getJoiSchemas } from './../utils/validator';
import { UserCtrl } from "../controller/UserCtrl";
const router = new Router({
  prefix: '/users'
});
// 添加用户验证
const pushUserSchema = getJoiSchemas({
  username: Joi.string().required()
});

router.get('/', UserCtrl.getUsers)
      .post('/', validator(pushUserSchema), UserCtrl.addUser)

module.exports = router
