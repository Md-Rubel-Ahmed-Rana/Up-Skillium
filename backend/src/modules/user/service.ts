import { Types } from "mongoose";
import { User } from "./model";
import {
  IAddress,
  ICreateUser,
  IEmergencyContact,
  IGetUser,
  IUserBasicInfo,
  UserAnalyticsParams,
} from "./interface";
import { RoleService } from "../role/service";
import ApiError from "@/shared/apiError";
import { HttpStatusCode } from "@/lib/httpStatus";
import { BcryptInstance } from "@/lib/bcrypt";
import generateStudentId from "@/utils/generateStudentId";
import generateAdminId from "@/utils/generateAdminId";
import generateTeacherId from "@/utils/generateTeacherId";
import { CloudinaryService } from "@/config/cloudinary";

class Service {
  async createUser(user: ICreateUser): Promise<void> {
    const existingUser = await User.findOne({ email: user?.email });

    if (existingUser) {
      throw new ApiError(
        HttpStatusCode.CONFLICT,
        "Email already exists. Please use a different email.",
      );
    }

    const userRole = (user?.role as string).toLowerCase();
    const role = await RoleService.getRoleByRoleName(userRole);

    user.password = await BcryptInstance.hash(user.password);
    user.role = role?.id as Types.ObjectId;

    if (role?.name.toLowerCase().trim() === "student") {
      const studentId = await this.createStudentId();
      user.userRoleId = studentId;
      user.roleName = "student";
    } else if (role?.name.toLowerCase().trim() === "instructor") {
      const instructorId = await this.createInstructorId();
      user.userRoleId = instructorId;
      user.roleName = "instructor";
    } else if (role?.name.toLowerCase().trim() === "admin") {
      const adminId = await this.createAdminId();
      user.userRoleId = adminId;
      user.roleName = "admin";
    }
    await User.create(user);
  }
  async createStudentId(): Promise<string> {
    const lastStudent = await User.findOne({ roleName: "student" }).sort({
      createdAt: -1,
    });
    const studentId = lastStudent
      ? generateStudentId(lastStudent.userRoleId)
      : generateStudentId("US-ST-0000");
    return studentId;
  }

  async createAdminId(): Promise<string> {
    const lastAdmin = await User.findOne({ roleName: "admin" }).sort({
      createdAt: -1,
    });
    const adminId = lastAdmin
      ? generateAdminId(lastAdmin.userRoleId)
      : generateAdminId("US-AD-0000");
    return adminId;
  }
  async createInstructorId(): Promise<string> {
    const lastInstructor = await User.findOne({ roleName: "instructor" }).sort({
      createdAt: -1,
    });
    const instructorId = lastInstructor
      ? generateTeacherId(lastInstructor.userRoleId)
      : generateTeacherId("US-TE-0000");
    return instructorId;
  }
  async findUserByEmail(email: string) {
    return User.findOne({ email: email });
  }
  async findUserById(id: string | Types.ObjectId) {
    const user = await User.findById(id)
      .select({ password: 0 })
      .populate("role");
    return user;
  }
  async findUsers(
    search: string = "",
    page: number = 1,
    limit: number = 5,
  ): Promise<IGetUser[]> {
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
      .select({ password: 0 })
      .populate("role")
      .skip(skip)
      .limit(limit);
    return users;
  }
  async findUserByEmailWithPassword(email: string) {
    return await User.findOne({ email: email }).populate("role");
  }
  async getUsersEmailByIds(
    ids: Types.ObjectId[],
  ): Promise<{ email: string }[]> {
    const users = await User.find({ _id: { $in: ids } }).select({
      email: 1,
    });
    const usersEmails = users.map((user) => {
      return { email: user?.email };
    });
    return usersEmails;
  }
  async updateUser(
    id: string,
    updatedData: Partial<ICreateUser>,
  ): Promise<void> {
    await User.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async updateUserBasicInfo(
    id: Types.ObjectId,
    updatedData: IUserBasicInfo,
  ): Promise<void> {
    await User.findByIdAndUpdate(id, { $set: { ...updatedData } });
  }
  async updateUserAddress(
    id: Types.ObjectId,
    updatedData: IAddress,
  ): Promise<void> {
    await User.findByIdAndUpdate(id, { $set: { address: { ...updatedData } } });
  }
  async updateEmergencyContact(
    id: Types.ObjectId,
    updatedData: IEmergencyContact,
  ): Promise<void> {
    await User.findByIdAndUpdate(id, {
      $set: { emergencyContact: { ...updatedData } },
    });
  }
  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const isExist = await User.findById(userId);
    if (!isExist) {
      throw new ApiError(404, "User was not found!");
    } else {
      const isOldPasswordMatched = await BcryptInstance.compare(
        oldPassword,
        isExist.password,
      );
      if (!isOldPasswordMatched) {
        throw new ApiError(
          400,
          "Incorrect password. Please enter your correct password",
        );
      } else {
        const newHashedPassword = await BcryptInstance.hash(newPassword);
        await User.findByIdAndUpdate(userId, {
          $set: { password: newHashedPassword },
        });
      }
    }
  }
  async resetPassword(userId: string, newPassword: string): Promise<void> {
    const isExist = await User.findById(userId);
    if (!isExist) {
      throw new ApiError(404, "User was not found!");
    } else {
      const newHashedPassword = await BcryptInstance.hash(newPassword);
      await User.findByIdAndUpdate(userId, {
        $set: { password: newHashedPassword },
      });
    }
  }
  async updateProfileImage(id: Types.ObjectId, imageUrl: string) {
    const user = await User.findById(id);
    if (user && user?.image) {
      await CloudinaryService.deleteSingle(user?.image, "image");
    }
    await User.findByIdAndUpdate(id, { $set: { image: imageUrl } });
  }
  async activeOrInactiveAccount(
    userId: Types.ObjectId,
    status: string,
  ): Promise<void> {
    await User.findByIdAndUpdate(userId, { $set: { status: status } });
  }
  async deleteUserAccount(id: Types.ObjectId): Promise<void> {
    await User.findByIdAndDelete(id);
  }
  async getUserAnalyticsSummary(params: UserAnalyticsParams) {
    const { startDate, endDate } = params;

    const match: any = {};
    if (startDate || endDate) {
      match.createdAt = {};
      if (startDate) match.createdAt.$gte = new Date(startDate);
      if (endDate) match.createdAt.$lte = new Date(endDate);
    }

    const summary = await User.aggregate([
      { $match: match },
      {
        $facet: {
          totalUsers: [{ $count: "count" }],

          activeUsers: [{ $match: { status: "active" } }, { $count: "count" }],

          inactiveUsers: [
            { $match: { status: "inactive" } },
            { $count: "count" },
          ],

          usersByDate: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                count: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
            {
              $project: {
                _id: 0,
                date: "$_id",
                count: 1,
              },
            },
          ],

          genderDistribution: [
            {
              $group: {
                _id: "$gender",
                count: { $sum: 1 },
              },
            },
          ],

          roleDistribution: [
            {
              $group: {
                _id: "$roleName",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const result = summary[0];

    return {
      totalUsers: result.totalUsers[0]?.count || 0,
      activeUsers: result.activeUsers[0]?.count || 0,
      inactiveUsers: result.inactiveUsers[0]?.count || 0,
      usersByDate: result.usersByDate,
      genderDistribution: result.genderDistribution.map((g: any) => ({
        gender: g?._id || "unknown",
        count: g?.count,
      })),
      roleDistribution: result.roleDistribution.map((r: any) => ({
        role: r?._id || "unknown",
        count: r?.count,
      })),
    };
  }
  async getAllStudent() {
    const roles = await RoleService.getAllRoles();
    const studentRole: any = roles.find((role) => role?.name === "student");
    const students = await User.find({
      role: studentRole?.id || studentRole?._id,
    });
    return students;
  }
  async getAllTeamMembers() {
    const roles = await RoleService.getAllRoles();

    const teamRoles = roles
      .filter((role) => role?.name !== "student")
      .map((role: any) => role?.id || role?._id);

    const teamMembers = await User.find({
      role: { $in: teamRoles },
    });

    return teamMembers;
  }
}

export const UserService = new Service();
