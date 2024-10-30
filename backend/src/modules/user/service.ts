import { Types } from "mongoose";
import { User } from "./model";
import { ICreateUser, IGetUser, IUserBasicInfo } from "./interface";
import { BcryptInstance } from "../../lib/bcrypt";
import ApiError from "../../shared/apiError";
import { RoleService } from "../role/service";
import { StudentService } from "../student/service";
import { InstructorService } from "../instructor/service";
import { AdminService } from "../admin/service";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";

class Service {
  async createUser(user: ICreateUser): Promise<void> {
    const userRole = user.role as string;
    const role = await RoleService.getRoleByRoleName(userRole);

    user.password = await BcryptInstance.hash(user.password);
    user.role = role?.id as Types.ObjectId;

    const newUser = await User.create(user);

    if (role?.role === "student") {
      await StudentService.createNewStudent(newUser._id);
    } else if (role?.role === "instructor") {
      await InstructorService.createNewInstructor(newUser._id);
    } else if (role?.role === "admin") {
      await AdminService.createNewAdmin(newUser._id);
    }
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
  async updateUserBasicInfo(
    id: Types.ObjectId,
    updatedData: IUserBasicInfo
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
  async updateProfileImage(id: Types.ObjectId, imageUrl: string) {
    const user = await User.findById(id);
    if (user && user?.image) {
      await FileUploadMiddleware.deleteSingle(user?.image);
    }
    await User.findByIdAndUpdate(id, { $set: { image: imageUrl } });
  }
}

export const UserService = new Service();
