"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dbconfig_1 = require("./dbconfig");
const connectMongo = async () => {
    await (0, mongoose_1.connect)(dbconfig_1.DBLink)
        .then(() => {
        console.log('数据库连接成功');
    })
        .catch(err => {
        console.log('数据库连接失败', err);
    });
};
exports.default = connectMongo;
