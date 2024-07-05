"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.createPostInput = exports.userSignIn = exports.userSignUp = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userSignUp = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8),
    username: zod_1.default.string().optional()
});
exports.userSignIn = exports.userSignUp.pick({
    email: true,
    password: true
});
exports.createPostInput = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    published: zod_1.default.boolean()
});
exports.updatePost = zod_1.default.object({
    id: zod_1.default.string(),
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().optional()
});
