import { Router } from "express";
import { AuthRoutes } from "../auth/route";
import { CourseRoutes } from "../course/routes";
import { RoleRoutes } from "../role/routes";
import { CategoryRoutes } from "../category/routes";
import { CourseOutlineRoutes } from "../course-outline/routes";
import { EducationRoutes } from "../education/routes";
import { UserRoutes } from "../user/routes";
import { ModuleRoutes } from "../module/routes";
import { LessonRoutes } from "../lesson/routes";
import { QuizRoutes } from "../quiz/routes";
import { CertificateRoutes } from "../certificate/routes";
import { EnrollmentRoutes } from "../enrollment/routes";
import { QuizSubmissionRoutes } from "../quiz-submission/routes";
import { AssignmentSubmissionRoutes } from "../assignment-submission/routes";
import { StripePaymentRoutes } from "../stripe-payment/routes";
import { ReviewRoutes } from "../review/routes";
import { AssignmentRoutes } from "../assignment/routes";
import { LiveClassRoutes } from "../live-class/routes";
import { MyCourseRoutes } from "../my-courses/routes";

const router = Router();

router.use("/auth", AuthRoutes);

router.use("/user", UserRoutes);

router.use("/course", CourseRoutes);

router.use("/role", RoleRoutes);

router.use("/category", CategoryRoutes);

router.use("/course-outline", CourseOutlineRoutes);

router.use("/module", ModuleRoutes);

router.use("/lesson", LessonRoutes);

router.use("/quiz", QuizRoutes);

router.use("/education", EducationRoutes);

router.use("/certificate", CertificateRoutes);

router.use("/enrollment", EnrollmentRoutes);

router.use("/quiz-submission", QuizSubmissionRoutes);

router.use("/assignment-submission", AssignmentSubmissionRoutes);

router.use("/assignment", AssignmentRoutes);

router.use("/stripe", StripePaymentRoutes);

router.use("/review", ReviewRoutes);

router.use("/live-class", LiveClassRoutes);

router.use("/my-course", MyCourseRoutes);

export const RootRoutes = router;
