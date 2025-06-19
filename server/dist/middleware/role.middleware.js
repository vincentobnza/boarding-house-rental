"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = void 0;
const requireRole = (roles) => {
    return (req, res, next) => {
        // Assume req.user is set after authentication (e.g., by a JWT middleware)
        const user = req.user;
        if (!user) {
            res.status(401).json({ message: "Unauthorized: No user found" });
            return;
        }
        if (!roles.includes(user.role)) {
            res.status(403).json({ message: "Forbidden: Insufficient role" });
            return;
        }
        next();
    };
};
exports.requireRole = requireRole;
