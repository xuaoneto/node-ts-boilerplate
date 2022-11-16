"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const service_1 = __importDefault(require("./service"));
const loginController = (0, express_1.Router)();
loginController.post("/login", (req, res) => {
    const { email, password } = req.body;
    const login = new service_1.default(email, password);
    if (login.validate()) {
        const userId = login.getUserId();
        const SECRET = process.env.SECRET;
        const loginTime = 3600; // 1h
        const token = jsonwebtoken_1.default.sign({ userId }, SECRET, { expiresIn: loginTime });
        const exp = Date.now() + loginTime * 1000;
        return res.status(200).json({ token, exp });
    }
    else
        return res.status(401).json({ message: "Usuário ou senha incorretos" });
});
exports.default = loginController;
