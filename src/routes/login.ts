import Joi from "joi";
import Router from "koa-router";
import { validator } from '@/middlewares/index';
import UserCtrl from "@/controller/UserCtrl";

const router = new Router();
const loginRule = {
  name: Joi.string().required(),
  password: Joi.string().required()
};
router.post("/login", validator(loginRule), UserCtrl.checkUser);

module.exports = router

