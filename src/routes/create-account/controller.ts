import { Router } from "express";
import AccountService from "./service";

const createController = Router();

createController.post("/create-account", async (req, res) => {
  const account = new AccountService(req.body);
  const { isValid, errors } = account.validate();

  if (isValid) {
    const { status, message } = await account.save();
    res.status(status).json({ status, message });
  } else return res.status(400).json({ errors });
});

export default createController;
