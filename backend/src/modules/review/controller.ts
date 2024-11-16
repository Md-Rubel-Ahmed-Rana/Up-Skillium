import { Request, Response } from "express";
import RootController from "../../shared/rootController";
import { ReviewService } from "./service";
import { Types } from "mongoose";

class Controller extends RootController {
  addReview = this.catchAsync(async (req: Request, res: Response) => {
    await ReviewService.addReview(req.body);
    this.apiResponse(res, {
      statusCode: 201,
      success: true,
      message: "Review added successfully",
      data: null,
    });
  });
  getAllReviews = this.catchAsync(async (req: Request, res: Response) => {
    const data = await ReviewService.getAllReviews();
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Reviews retrieved successfully",
      data: data,
    });
  });
  getSingleReview = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    const data = await ReviewService.getSingleReview(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review retrieved successfully",
      data: data,
    });
  });
  getAllReviewByReviewTo = this.catchAsync(
    async (req: Request, res: Response) => {
      const reviewToId = req.params.reviewToId as unknown as Types.ObjectId;
      const data = await ReviewService.getAllReviewByReviewTo(reviewToId);
      this.apiResponse(res, {
        statusCode: 200,
        success: true,
        message: "Reviews retrieved successfully",
        data: data,
      });
    }
  );
  updateReview = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await ReviewService.updateReview(id, req.body);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review updated successfully",
      data: null,
    });
  });
  deleteReview = this.catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id as unknown as Types.ObjectId;
    await ReviewService.deleteReview(id);
    this.apiResponse(res, {
      statusCode: 200,
      success: true,
      message: "Review deleted successfully",
      data: null,
    });
  });
}

export const ReviewController = new Controller();
