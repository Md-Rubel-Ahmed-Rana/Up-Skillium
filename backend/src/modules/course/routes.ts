import { Router } from "express";
import { CourseController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";

const router = Router();

router.post("/create", CourseController.createCourse);

router.get("/", CourseController.getCourses);

router.get("/:id", CourseController.getSingleCourse);

router.delete("/:id", CourseController.deleteCourse);

router.patch("/update-basic-info/:id", CourseController.updateCourseBasicInfo);

router.patch("/update-price/:id", CourseController.updateCoursePrice);

router.patch(
  "/update-tags-techs/:id",
  CourseController.updateCourseTagsTechnologies
);

router.patch(
  "/update-instructor/:courseId/:instructorId",
  CourseController.updateCourseInstructor
);

router.patch(
  "/change-course-image/:id",
  upload.single("file"),
  FileUploadMiddleware.singleFile("course-thumbnail-images"),
  CourseController.updateCourseImage
);

router.patch(
  "/change-course-introductory-video/:id",
  upload.single("file"),
  FileUploadMiddleware.singleFile("course-introductory-videos"),
  CourseController.updateCourseIntroductoryVideo
);

export const CourseRoutes = router;
