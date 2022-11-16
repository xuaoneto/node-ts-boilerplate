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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../../db");
const mongo_errors_1 = require("../../utils/mongo-errors");
class AccountService {
    constructor({ email, name, password, phone }) {
        this.props = { email, name, password, phone };
    }
    validate() {
        const fields = [
            !!this.props.email,
            !!this.props.password,
            !!this.props.phone,
            !!this.props.name,
        ];
        const errors = [];
        if (this.props.email) {
            const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.props.email);
            if (!isValidEmail)
                errors.push("Email Inválido");
        }
        if (this.props.password) {
            const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(this.props.password);
            if (!isValidPassword)
                errors.push("Senha Inválida");
        }
        if (this.props.name) {
            const isValidName = this.props.name.length > 2;
            if (!isValidName)
                errors.push("Nome Inválido");
        }
        if (this.props.phone) {
            const isValidName = /^[0-9]\d{10}$/.test(this.props.phone);
            if (!isValidName)
                errors.push("Telefone Inválido");
        }
        if (fields.includes(false)) {
            errors.push("Preencha todos os campos");
        }
        return { isValid: !errors.length, errors };
    }
    save() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const db = yield (0, db_1.getDatabase)();
                const respDb = yield db.collection("users").insertOne(this);
                return { status: 204, message: "sucesso" };
            }
            catch (e) {
                const error = e;
                return {
                    message: (_b = mongo_errors_1.mongoErrors[(_a = error.code) !== null && _a !== void 0 ? _a : ""]) !== null && _b !== void 0 ? _b : "Erro de Inserção",
                    status: 409,
                };
            }
        });
    }
}
exports.default = AccountService;
