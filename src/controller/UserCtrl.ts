import { Context } from "koa";

export class UserCtrl {

  // 添加用户
  public static async addUser(ctx: Context) {
    ctx.body = 'Yaho Controller'
  }
  // 添加所有用户
  public static async getUsers(ctx: Context) {
    ctx.body = 'all users'
  }
}