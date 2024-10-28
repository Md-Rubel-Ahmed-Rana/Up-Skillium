import { Types } from "mongoose";
import { User } from "./model";
import { ICreateUser, IGetUser } from "./interface";
import { BcryptInstance } from "../../lib/bcrypt";
import ApiError from "../../shared/apiError";

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
  async findUsers(
    search: string = "",
    page: number = 1,
    limit: number = 5
  ): Promise<{ users: IGetUser[]; total: number }> {
    const searchQuery = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const skip = (page - 1) * limit;

    const users: any = await User.find(searchQuery)
      .skip(skip)
      .limit(limit)
      .lean()
      .exec();
    const total = await User.countDocuments();
    return { users, total };
  }
  async findUserByEmailWithPassword(email: string) {
    return User.findOne({ email: email });
  }
  async updateUser(
    id: string,
    updatedData: Partial<ICreateUser>
  ): Promise<void> {
    await User.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string
  ): Promise<void> {
    const isExist = await User.findById(userId);
    if (!isExist) {
      throw new ApiError(404, "User was not found!");
    } else {
      const isOldPasswordMatched = await BcryptInstance.compare(
        oldPassword,
        isExist.password
      );
      if (!isOldPasswordMatched) {
        throw new ApiError(
          400,
          "Incorrect password. Please enter your correct password"
        );
      } else {
        const newHashedPassword = await BcryptInstance.hash(newPassword);
        await User.findByIdAndUpdate(userId, {
          $set: { password: newHashedPassword },
        });
      }
    }
  }
}

export const UserService = new Service();
