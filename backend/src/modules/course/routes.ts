import { Router } from "express";
import { CourseController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";

const router = Router();

router.post("/create", CourseController.createCourse);

router.get("/", CourseController.getCourses);

router.get("/:id", CourseController.getSingleCourse);

router.patch("/:id", CourseController.updateCourse);

router.delete("/:id", CourseController.deleteCourse);

router.patch(
  "/change-course-image/:id",
  upload.single("file"),
  FileUploadMiddleware.singleFile("course-thumbnail-images"),
  CourseController.updateCourseImage
);

export const CourseRoutes = router;
