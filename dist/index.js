"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("./routes/login/controller"));
const controller_2 = __importDefault(require("./routes/user/controller"));
const body_parser_1 = require("body-parser");
const controller_3 = __importDefault(require("./routes/create-account/controller"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use(controller_1.default);
app.use(controller_2.default);
app.use(controller_3.default);
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
