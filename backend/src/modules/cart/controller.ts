import { Request, Response } from "express";
import { CartService } from "./service";
import RootController from "@/shared/rootController";

class Controller extends RootController {
  addToCart = this.catchAsync(async (req: Request, res: Response) => {
    await CartService.addToCart(req.body);
    this.apiResponse(req, res, {
      statusCode: 201,
      success: true,
      message: "Course added to cart successfully",
      data: null,
    });
  });

  getAllCart = this.catchAsync(async (req: Request, res: Response) => {
    const data = await CartService.getAllCart();
    this.apiResponse(req, res, {
      statusCode: 200,
      success: true,
      message: "Carts retrieved successfully",
      data,
    });
  });

  getUserCart = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const data = await CartService.getUserCart(userId);
    this.apiResponse(req, res, {
      statusCode: 200,
      success: true,
      message: "Carts retrieved successfully",
      data,
    });
  });

  removeFromCart = this.catchAsync(async (req: Request, res: Response) => {
    const cartId = req.params.cartId;
    const data = await CartService.removeFromCart(cartId);
    this.apiResponse(req, res, {
      statusCode: 200,
      success: true,
      message: "Course removed from cart successfully",
      data,
    });
  });

  checkout = this.catchAsync(async (req: Request, res: Response) => {
    const userId = req.body.userId;
    const data = await CartService.checkout(userId);
    this.apiResponse(req, res, {
      statusCode: 200,
      success: true,
      message: "Checkout successful. Courses enrolled.",
      data,
    });
  });
}

export const CartController = new Controller();
