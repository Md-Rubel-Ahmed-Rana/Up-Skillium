import { Router } from "express";
import { ReviewController } from "./controller";

const router = Router();

router.post("/add", ReviewController.addReview);

router.get("/", ReviewController.getAllReviews);

router.get("/:id", ReviewController.getSingleReview);

router.get(
  "/by-review-to/:reviewToId",
  ReviewController.getAllReviewByReviewTo
);

router.patch("/:id", ReviewController.updateReview);

router.delete("/:id", ReviewController.deleteReview);

export const ReviewRoutes = router;
