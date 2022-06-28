"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const db_1 = __importDefault(require("./db"));
const config_1 = require("./utils/config");
const require_glob_1 = __importDefault(require("require-glob"));
const koa_views_1 = __importDefault(require("koa-views"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_onerror_1 = __importDefault(require("koa-onerror"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_static_1 = __importDefault(require("koa-static"));
const app = new koa_1.default();
// link mongodb
(0, db_1.default)();
// error handler
(0, koa_onerror_1.default)(app);
// middlewares
app.use((0, koa_static_1.default)(__dirname + "/public"))
    .use((0, koa_json_1.default)())
    .use((0, koa_logger_1.default)())
    .use((0, koa_bodyparser_1.default)({
    enableTypes: ["json", "form", "text"],
})).use((0, koa_views_1.default)(__dirname + "/views", {
    extension: "ejs",
}));
(0, require_glob_1.default)(['./routes/**/*']).then(function (modules) {
    Object.values(modules).forEach(m => {
        // 如果是路由就进行注册
        if (m instanceof koa_router_1.default) {
            app.use(m.routes())
                .use(m.allowedMethods());
        }
    });
});
/**
 * Get port from environment and store in Express.
 * app.set('port', port);
 */
const port = (0, config_1.normalizePort)(process.env.PORT || '3000');
app.listen(port, function () {
    console.log('listening  port：' + port);
});
