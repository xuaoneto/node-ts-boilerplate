import bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import { getDatabase } from "../../db";
import { NewUserDTO } from "../../models/new-user-dto";
import { mongoErrors } from "../../utils/mongo-errors";
class AccountService {
  private props: NewUserDTO;

  constructor({ email, name, password, phone }: NewUserDTO) {
    this.props = { email, name, password, phone };
  }
  validate() {
    const fields = [
      !!this.props.email,
      !!this.props.password,
      !!this.props.phone,
      !!this.props.name,
    ];
    const errors: string[] = [];
    if (this.props.email) {
      const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
        this.props.email
      );
      if (!isValidEmail) errors.push("Email Inválido");
    }
    if (this.props.password) {
      const isValidPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
        this.props.password
      );
      if (!isValidPassword) errors.push("Senha Inválida");
    }
    if (this.props.name) {
      const isValidName = this.props.name.length > 2;
      if (!isValidName) errors.push("Nome Inválido");
    }
    if (this.props.phone) {
      const isValidName = /^[0-9]\d{10}$/.test(this.props.phone);
      if (!isValidName) errors.push("Telefone Inválido");
    }
    if (fields.includes(false)) {
      errors.push("Preencha todos os campos");
    }
    return { isValid: !errors.length, errors };
  }

  async save(adminPass?: string) {
    try {
      const db = await getDatabase();
      const hashedPass = await bcrypt.hash(this.props.password, 10);
      const admin = adminPass && process.env.SECRET_ADMIN_PASS === adminPass;
      const insertVersion = {
        ...this.props,
        password: hashedPass,
        userType: admin ? "admin" : "common",
      };
      const respDb = await db.collection("users").insertOne(insertVersion);
      return { status: 204, message: "sucesso" };
    } catch (e) {
      const error = e as MongoError;
      return {
        message: mongoErrors[error.code ?? ""] ?? "Erro de Inserção",
        status: 409,
      };
    }
  }
}

export default AccountService;
