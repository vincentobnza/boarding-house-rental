"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const userMiddleware = (req, res, next) => {
    // Example: Log request method and URL
    console.log(`[UserMiddleware] ${req.method} ${req.originalUrl}`);
    next();
};
exports.userMiddleware = userMiddleware;
