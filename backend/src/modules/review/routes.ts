import { Router } from "express";
import { ReviewController } from "./controller";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post("/add", JwtInstance.verifyToken, ReviewController.addReview);

router.get("/", ReviewController.getAllReviews);

router.get("/course", ReviewController.getAllCourseReviews);

router.get(
  "/instructor",
  JwtInstance.verifyToken,
  ReviewController.getAllInstructorReviews
);

router.get("/:id", ReviewController.getSingleReview);

router.get(
  "/by-review-to/:reviewToId",
  ReviewController.getAllReviewByReviewTo
);

router.patch("/:id", JwtInstance.verifyToken, ReviewController.updateReview);

router.delete("/:id", JwtInstance.verifyToken, ReviewController.deleteReview);

export const ReviewRoutes = router;
