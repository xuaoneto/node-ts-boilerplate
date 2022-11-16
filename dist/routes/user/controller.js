"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt_guard_1 = require("../../utils/jwt-guard");
const userController = (0, express_1.Router)();
userController.get("/", jwt_guard_1.JWTGuard, (req, res) => {
    res.json({ message: "Express + TypeScript Server Module" });
});
exports.default = userController;
