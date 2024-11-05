import { Types } from "mongoose";

export type IStudentProgress = {
  userId: Types.ObjectId;
  courses: [
    {
      courseId: Types.ObjectId;
      isCourseCompleted: boolean;
      completionPercentage?: number;
      lastLessonCompleted: Types.ObjectId;
      modules: [
        {
          moduleId: Types.ObjectId;
          isModuleCompleted: boolean;
          lessons: [
            {
              lessonId: Types.ObjectId;
              isLessonCompleted: boolean;
            }
          ];
        }
      ];
    }
  ];
};
