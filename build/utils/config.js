"use strict";
/**
 * Normalize a port into a number, string, or false.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePort = void 0;
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
exports.normalizePort = normalizePort;
