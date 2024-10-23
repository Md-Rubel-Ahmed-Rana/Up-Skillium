import { Types } from "mongoose";
import { User } from "./model";
import { ICreateUser } from "./user.interface";

class Service {
  async register(user: ICreateUser): Promise<Types.ObjectId> {
    const newUser = await User.create(user);
    return newUser._id;
  }
  async findUserByEmail(email: string) {
    return User.findOne({ email: email });
  }
  async findUserById(id: string) {
    return User.findById(id);
  }
  async findUserByEmailWithPassword(id: string) {
    return User.findById(id);
  }
}

export const UserService = new Service();
