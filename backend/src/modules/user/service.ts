import { Types } from "mongoose";
import { User } from "./model";
import { ICreateUser } from "./user.interface";
import { BcryptInstance } from "../../lib/bcrypt";

class Service {
  async register(user: ICreateUser): Promise<Types.ObjectId> {
    user.password = await BcryptInstance.hash(user.password);
    const newUser = await User.create(user);
    return newUser._id;
  }
  async findUserByEmail(email: string) {
    return User.findOne({ email: email });
  }
  async findUserById(id: string) {
    const user = await User.findById(id)
      .select({ password: 0 })
      .populate("role");
    return user;
  }
  async findUserByEmailWithPassword(email: string) {
    return User.findOne({ email: email });
  }
}

export const UserService = new Service();
