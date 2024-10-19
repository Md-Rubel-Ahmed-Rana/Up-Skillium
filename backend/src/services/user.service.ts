import { config } from "../config/envConfig";
import {
  GetUser,
  LoginUser,
  PostUser,
  UpdateUser,
  UserProjection,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Service {
  async register(user: PostUser): Promise<void> {
    const hashedPass = await bcrypt.hash(user.password, 12);
    user.password = hashedPass;
    await User.create(user);
  }

  async login(
    credentials: LoginUser
  ): Promise<{ accessToken: string } | boolean> {
    const user = await User.findOne({ email: credentials.email });
    if (!user) {
      return false;
    }

    const isMatched = await bcrypt.compare(credentials.password, user.password);
    if (!isMatched) {
      return false;
    }
    const payload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const accessToken = jwt.sign(payload, config.jwt.accessTokenSecret, {
      expiresIn: config.jwt.accessTokenExpire,
    });

    return { accessToken };
  }

  async findUsers(
    searchText: string = "",
    filters: { [key: string]: any } = {},
    page: number = 1,
    limit: number = 10,
    sortDirection: string = "asc"
  ): Promise<GetUser[]> {
    let pipeline: any[] = [{ $project: UserProjection }];

    // Match stage for search
    if (searchText) {
      pipeline.push({
        $match: {
          $or: [
            { name: { $regex: searchText, $options: "i" } },
            { email: { $regex: searchText, $options: "i" } },
          ],
        },
      });
    }

    // Filter stage
    if (Object.keys(filters).length > 0) {
      const filterExpressions = Object.keys(filters).map((key) => ({
        [key]: filters[key],
      }));
      pipeline.push({ $match: { $and: filterExpressions } });
    }

    // Sort stage
    if (sortDirection) {
      const sortObj: { [key: string]: number } = {};
      sortObj["name"] = sortDirection === "asc" ? 1 : -1;
      sortObj["email"] = sortDirection === "asc" ? 1 : -1;
      sortObj["createdAt"] = sortDirection === "asc" ? 1 : -1;
      sortObj["updatedAt"] = sortDirection === "asc" ? 1 : -1;

      pipeline.push({ $sort: sortObj });
    }

    // Pagination stage
    if (page && limit) {
      pipeline.push(
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        }
      );
    }

    const users: GetUser[] = (await User.aggregate(pipeline)) as GetUser[];

    return users;
  }

  async findSingleUserById(userId: string): Promise<GetUser | null> {
    const user = await User.findById(userId).select(UserProjection);
    return user;
  }

  async updateUser(userId: string, updatedData: UpdateUser): Promise<GetUser> {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { ...updatedData },
      },
      { upsert: true, new: true }
    ).select(UserProjection);
    return updatedUser;
  }

  async deleteUser(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }
}

export const UserService = new Service();
