import dotenv from "dotenv";
import express, { Express } from "express";
import loginController from "./routes/login/controller";
import userController from "./routes/user/controller";
import { json } from "body-parser";
import createController from "./routes/create-account/controller";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(cors());
app.use(json());
app.use(loginController);
app.use(userController);
app.use(createController);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
