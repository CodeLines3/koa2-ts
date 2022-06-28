"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseData = exports.RepCode = void 0;
class RepCode {
    100;
    101;
    102;
    200;
    201;
    202;
    203;
    204;
    205;
    206;
    207;
    208;
    226;
    300;
    301;
    302;
    303;
    304;
    305;
    307;
    308;
    400;
    401;
    402;
    403;
    404;
    405;
    406;
    407;
    408;
    409;
    410;
    411;
    412;
    413;
    414;
    415;
    416;
    417;
    418;
    422;
    423;
    424;
    426;
    428;
    429;
    431;
    500;
    501;
    502;
    503;
    504;
    505;
    506;
    507;
    508;
    510;
    511;
}
exports.RepCode = RepCode;
/**
 * @description 统一返回格式
 */
function ResponseData(code, data) {
    return {
        code,
        data,
        message: RepCode[code],
    };
}
exports.ResponseData = ResponseData;
