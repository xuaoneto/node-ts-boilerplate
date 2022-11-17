import { Router } from "express";
import jwt from "jsonwebtoken";
import LoginService from "./service";

const loginController = Router();

loginController.post("/login", async (req, res) => {
  const login = new LoginService(req.body);
  const isValid = await login.verify();
  if (isValid) {
    const userId = login.getUserId();
    const SECRET = process.env.SECRET as string;
    const loginTime = 3600; // 1h
    const token = jwt.sign({ userId }, SECRET, { expiresIn: loginTime });
    const exp = Date.now() + loginTime * 1000;
    return res.status(200).json({ token, exp });
  } else
    return res.status(401).json({ message: "Usuário ou senha incorretos" });
});

export default loginController;
