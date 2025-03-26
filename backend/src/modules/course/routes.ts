import { Router } from "express";
import { CourseController } from "./controller";
import upload from "../../config/multer";
import { FileUploadMiddleware } from "../../middlewares/fileUploaderMiddleware";
import { JwtInstance } from "../../lib/jwt";

const router = Router();

router.post(
  "/create",
  JwtInstance.verifyToken,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "introductoryVideo" },
  ]),
  FileUploadMiddleware.uploadCourseImageAndIntroVideo(),
  CourseController.createCourse
);

router.get("/", CourseController.getCourses);

router.get("/related-courses", CourseController.getMatchedRelatedCourses);

router.get("/published/courses", CourseController.getOnlyPublishedCourses);

router.get(
  "/category/courses/:category",
  CourseController.getCoursesByCategory
);

router.get("/:id", CourseController.getSingleCourse);

router.get(
  "/instructor/:instructorId",
  JwtInstance.verifyToken,
  CourseController.getCoursesByInstructor
);

router.get(
  "/my-students/:instructorId",
  JwtInstance.verifyToken,
  CourseController.getMyStudentsByInstructor
);

router.get(
  "/students/:courseId",
  JwtInstance.verifyToken,
  CourseController.getStudentsFromCourse
);

router.delete("/:id", JwtInstance.verifyToken, CourseController.deleteCourse);

router.patch(
  "/update-basic-info/:id",
  JwtInstance.verifyToken,
  CourseController.updateCourseBasicInfo
);

router.patch(
  "/update-price/:id",
  JwtInstance.verifyToken,
  CourseController.updateCoursePrice
);

router.patch(
  "/update-tags-techs/:id",
  JwtInstance.verifyToken,
  CourseController.updateCourseTagsTechnologies
);

router.patch(
  "/update-instructor/:courseId/:instructorId",
  JwtInstance.verifyToken,
  CourseController.updateCourseInstructor
);

router.patch(
  "/change-course-image/:id",
  JwtInstance.verifyToken,
  upload.single("file"),
  FileUploadMiddleware.singleFile("course-thumbnail-images"),
  CourseController.updateCourseImage
);

router.patch(
  "/change-course-introductory-video/:id",
  JwtInstance.verifyToken,
  upload.single("file"),
  FileUploadMiddleware.singleFile("course-introductory-videos"),
  CourseController.updateCourseIntroductoryVideo
);

export const CourseRoutes = router;
