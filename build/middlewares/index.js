"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
const joi_1 = __importDefault(require("joi"));
const responseUtil_1 = require("../utils/responseUtil");
function validator(schemas) {
    return async function validateSchema(ctx, next) {
        let data;
        switch (ctx.method) {
            case 'GET':
                data = ctx.query;
                break;
            case 'POST':
                data = ctx.request.body;
                break;
            case 'DELETE':
                data = ctx.params;
                break;
            default:
                break;
        }
        const { error } = joi_1.default.object(schemas).validate(data);
        if (error) {
            ctx.body = (0, responseUtil_1.ResponseData)(400);
            return;
        }
        await next();
    };
}
exports.validator = validator;
