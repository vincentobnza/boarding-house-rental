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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const users_models_1 = __importDefault(require("../models/users.models"));
// Get all users
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield users_models_1.default.find();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
// Get user by ID
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findById(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.getUserById = getUserById;
// Create a new user
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = new users_models_1.default(req.body);
        yield user.save();
        res.status(201).json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
// Update user
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
// Delete user
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_models_1.default.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "User deleted" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
