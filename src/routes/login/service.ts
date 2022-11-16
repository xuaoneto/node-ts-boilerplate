class LoginService {
  private readonly email;
  private readonly password;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
    Object.freeze(this);
  }
  validate() {
    if (this.email === "joao@gmail.com" && this.password === "123") return true;
    else return false;
  }
  getUserId() {
    return 1;
  }
}

export default LoginService;
