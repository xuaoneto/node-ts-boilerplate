"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginService {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        Object.freeze(this);
    }
    validate() {
        if (this.email === "joao@gmail.com" && this.password === "123")
            return true;
        else
            return false;
    }
    getUserId() {
        return 1;
    }
}
exports.default = LoginService;
