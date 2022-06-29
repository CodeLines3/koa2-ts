import { Context } from "koa";
import { nanoid } from "nanoid";
import User from "../model/User";
import { ResponseData } from "../utils/responseUtil";

export default class UserCtrl {
  // 添加用户
  public static async addUser(ctx: Context) {
    const { name, age = 26 } = ctx.query;
    const UserSchema = new User({
      name,
      age
    });
    const data = await UserSchema.save({safe: true});
    if (data) {
      ctx.body = ResponseData(200, data)
    } else {
      ctx.body = ResponseData(500)
    }
  }
  // 查询所有用户
  public static async getUsers(ctx: Context) {
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
    const data = await User.deleteOne({ id })
    if (data) {
      ctx.body = ResponseData(200, data);
    } else {
      ctx.body = ResponseData(500, data);
    }
  }
}
