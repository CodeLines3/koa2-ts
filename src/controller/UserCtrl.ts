import { Context } from "koa";
import { nanoid } from "nanoid";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import User from "@/model/User";
import { getToken } from "@/utils";
import { ResponseData } from "@/utils/responseUtil";
import { Document } from "mongoose";

export default class UserCtrl {
  // 查询所有用户
  public static async getUsers(ctx: Context, next) {
    const data = await User.find();
    ctx.body = ResponseData(200, data);
  }

  // 更新用户
  public static async upadteUsers(ctx: Context) {
    const userSchema = new User();
  }

  // 删除用户
  public static async removeUsers(ctx: Context) {
    const { id } = ctx.params;
    const data = await User.deleteOne({ id });
    if (data) {
      ctx.body = ResponseData(200, data);
    } else {
      ctx.body = ResponseData(500, data);
    }
  }
  // 注册
  public static async register(ctx: Context) {
    const user = ctx.request.body;
    const salt = genSaltSync(10);
    // 前台登录密码加密
    const password = hashSync(user.password, salt);
    const UserSchema: Document<any> = new User({
      ...user,
      password
    });
    const data = UserSchema.save({ safe: true });
    if (data) {
      ctx.body = ResponseData(200, data);
    } else {
      ctx.status = 500;
      ctx.body = ResponseData(500);
    }
  }

  // 登录验证
  public static async checkUser(ctx: Context) {
    const user = ctx.request.body;
    const { password, name } = user;
    const result = await User.findOne({
      username: name,
    });
    const isLogin = compareSync(password, result!.password);
    // 与用户密码比较
    if (isLogin) {
      const token = getToken(user);
      ctx.body = ResponseData(200, {
        ...user,
        token,
      });
    } else {
      ctx.status = 403;
      ctx.body = ResponseData(403);
    }
  }
}
