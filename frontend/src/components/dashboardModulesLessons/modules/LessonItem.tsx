import DeleteLesson from "@/components/lessons/DeleteLesson";
import EditLesson from "@/components/lessons/EditLesson";
import { ILesson } from "@/types/lesson.type";
import LessonAssignment from "./assignment";
import LessonIntro from "./introduction";
import LessonQuiz from "./quiz";
import LessonVideo from "./video";

type Props = {
  lesson: ILesson;
};

const LessonItem = ({ lesson }: Props) => {
  return (
    <div className="border rounded-md shadow-sm p-4 hover:bg-gray-50 transition duration-200">
      <div className="flex justify-between items-center mb-4">
        <h5 className="font-semibold lg:text-lg">
          {lesson?.serial}. {lesson?.title}
        </h5>
        <div className="flex items-center gap-2">
          <EditLesson isButton={false} lesson={lesson} />
          <DeleteLesson
            lessonId={lesson?.id}
            lessonTitle={lesson?.title}
            shouldAddIcon={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
        <p>
          <span className="font-medium">Type:</span> {lesson?.type}
        </p>
        <p>
          <span className="font-medium">Serial:</span> {lesson?.serial}
        </p>
        <p>
          <span className="font-medium">Created At:</span>{" "}
          {new Date(lesson?.createdAt).toLocaleDateString()}
        </p>
        <p>
          <span className="font-medium">Updated At:</span>{" "}
          {new Date(lesson?.updatedAt).toLocaleDateString()}
        </p>
      </div>
      <div className="my-2">
        {lesson?.type === "video" && <LessonVideo lesson={lesson} />}
      </div>
      <div className="my-2">
        {lesson?.type === "instruction" && <LessonIntro lesson={lesson} />}
      </div>
      <div className="my-2">
        {lesson?.type === "assignment" && <LessonAssignment lesson={lesson} />}
      </div>
      <div className="my-2">
        {lesson?.type === "quiz" && <LessonQuiz lesson={lesson} />}
      </div>
    </div>
  );
};

export default LessonItem;
