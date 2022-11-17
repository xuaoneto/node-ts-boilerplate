import { getDatabase } from "../../db";
import { ExistingUserDTO } from "../../models/existing-user";
import bcrypt from "bcrypt";
class LoginService {
  private props: ExistingUserDTO;
  private userId: string | null = null;

  constructor({ email, password }: ExistingUserDTO) {
    this.props = { email, password };
  }
  async verify() {
    const db = await getDatabase();
    const registration = await db
      .collection("users")
      .findOne({ email: this.props.email });
    if (registration) {
      this.userId = registration._id.toString();
      const isValid = await bcrypt.compare(
        this.props.password,
        registration.password
      );
      return isValid;
    } else {
      return false;
    }
  }
  getUserId() {
    return this.userId;
  }
}

export default LoginService;
