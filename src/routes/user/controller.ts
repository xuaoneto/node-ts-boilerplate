import { Router } from "express";
import { JWTGuard } from "../../utils/jwt-guard";

const userController = Router();

userController.get("/", JWTGuard, (req, res) => {
  res.json({ message: "Express + TypeScript Server Module" });
});

export default userController;
