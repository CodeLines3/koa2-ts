"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserScheme = new mongoose_1.Schema({
    id: { type: String, unique: true },
    name: String,
    age: Number,
    addr: String,
});
const User = (0, mongoose_1.model)('user', UserScheme);
exports.default = User;
