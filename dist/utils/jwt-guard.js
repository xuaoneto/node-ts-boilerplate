"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTGuard = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function JWTGuard(req, res, next) {
    const token = req.headers["authorization"];
    const SECRET = process.env.SECRET;
    jsonwebtoken_1.default.verify(token.replace("Bearer ", ""), SECRET, (err, deconded) => {
        if (err)
            return res.status(401).end();
        next();
    });
}
exports.JWTGuard = JWTGuard;
