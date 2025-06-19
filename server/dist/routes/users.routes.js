"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_controller_1 = require("../controllers/users.controller");
const user_middleware_1 = require("../middleware/user.middleware");
const role_middleware_1 = require("../middleware/role.middleware");
const router = (0, express_1.Router)();
router.use(user_middleware_1.userMiddleware);
// Helper to wrap async route handlers
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// Only admin can get all users
router.get("/", (0, role_middleware_1.requireRole)(["admin"]), asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_controller_1.getAllUsers)(req, res, next);
})));
router.get("/:id", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_controller_1.getUserById)(req, res, next);
})));
router.post("/", asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_controller_1.createUser)(req, res, next);
})));
// Only landlord and admin can update users
router.put("/:id", (0, role_middleware_1.requireRole)(["landlord", "admin"]), asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_controller_1.updateUser)(req, res, next);
})));
// Only admin can delete users
router.delete("/:id", (0, role_middleware_1.requireRole)(["admin"]), asyncHandler((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, users_controller_1.deleteUser)(req, res, next);
})));
exports.default = router;
