import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { logger } from "../config/logger";

class Controller {
  async register(req: Request, res: Response) {
    try {
      await UserService.register(req.body);
      res
        .status(201)
        .json({ success: true, message: "Registered successfully!" });
    } catch (error) {
      logger.error(`Error registering user: ${error}`);
      res.status(500).json({ success: false, message: "Registration failed" });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const result: any = await UserService.login(req.body);
      if (result?.accessToken) {
        res.status(200).json({
          success: true,
          message: "Login successfully!",
          accessToken: result.accessToken,
        });
      } else {
        res.status(401).json({
          success: false,
          message: "Login failed. Invalid credentials",
        });
      }
    } catch (error) {
      logger.error(`Error logging in user: ${error}`);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  }

  async auth(req: Request, res: Response) {
    try {
      res.status(200).json({
        success: true,
        message: "User found successfully!",
        data: req.user,
      });
    } catch (error) {
      logger.error(`Error retrieving user data: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve user data" });
    }
  }

  async findSingleUserById(req: Request, res: Response) {
    try {
      const user = await UserService.findSingleUserById(req.params.id);
      res.status(200).json({
        success: true,
        message: "User found successfully!",
        data: user,
      });
    } catch (error) {
      logger.error(`Error retrieving user data: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve user data" });
    }
  }

  async findUsers(req: Request, res: Response) {
    try {
      const searchText = req.query?.searchText as string;
      const filters = req.query?.filters as any;
      const page = Number(req.query?.page || "0");
      const limit = Number(req.query?.limit || "0");
      const sortDirection = req.query?.sortDirection as string;
      const users = await UserService.findUsers(
        searchText,
        filters,
        page,
        limit,
        sortDirection
      );
      res.status(200).json({
        success: true,
        message: "Users found successfully!",
        data: users,
      });
    } catch (error) {
      logger.error(`Error retrieving user data: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Failed to retrieve user data" });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const result = await UserService.updateUser(userId, req.body);
      res.status(200).json({
        success: true,
        message: "User updated successfully!",
        data: result,
      });
    } catch (error) {
      logger.error(`Error updating user data: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Failed to update user data" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId);
      res.status(200).json({
        success: true,
        message: "User deleted successfully!",
        data: null,
      });
    } catch (error) {
      logger.error(`Error deleting user data: ${error}`);
      res
        .status(500)
        .json({ success: false, message: "Failed to deleting user data" });
    }
  }
}

export const UserController = new Controller();
