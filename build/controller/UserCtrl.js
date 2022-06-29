"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nanoid_1 = require("nanoid");
const User_1 = __importDefault(require("../model/User"));
const responseUtil_1 = require("../utils/responseUtil");
class UserCtrl {
    // 添加用户
    static async addUser(ctx) {
        const { name, age = 26 } = ctx.query;
        const UserSchema = new User_1.default({
            id: (0, nanoid_1.nanoid)(),
            name,
            age,
            addr: 'sddfs',
        });
        const data = await UserSchema.save();
        if (data) {
            ctx.body = (0, responseUtil_1.ResponseData)(200, data);
        }
        else {
            ctx.body = (0, responseUtil_1.ResponseData)(500);
        }
    }
    // 查询所有用户
    static async getUsers(ctx) {
        const data = await User_1.default.find();
        ctx.body = (0, responseUtil_1.ResponseData)(200, data);
    }
    // 更新用户
    static async upadteUsers(ctx) {
        const userSchema = new User_1.default();
    }
    // 删除用户
    static async removeUsers(ctx) {
        const { id } = ctx.params;
        const data = await User_1.default.deleteOne({ id });
        if (data) {
            ctx.body = (0, responseUtil_1.ResponseData)(200, data);
        }
        else {
            ctx.body = (0, responseUtil_1.ResponseData)(500, data);
        }
    }
}
exports.default = UserCtrl;
