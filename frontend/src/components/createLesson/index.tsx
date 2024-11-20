import { useRouter } from "next/router";
import AssignmentOrIntroductionForm from "./AssignmentOrIntroductionForm";
import CreateQuizLesson from "./CreateQuizLesson";
import CreateVideoLesson from "./CreateVideoLesson";
import ModuleDropdown from "./ModuleDropdown";
import SelectedCourseModule from "./SelectedCourseModule";
import SelectLessonType from "./SelectLessonType";

const CreateLesson = () => {
  const { query } = useRouter();
  const type = query?.type as string;
  return (
    <div className="mt-3 p-2 lg:p-4">
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-2">
        <h2 className="text-lg lg:text-2xl font-semibold">Create New Lesson</h2>
        <SelectedCourseModule />
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:gap-5">
        <ModuleDropdown />
        <SelectLessonType />
      </div>
      {type ? (
        <>
          {type === "Video" && <CreateVideoLesson />}{" "}
          {type === "Quiz" && <CreateQuizLesson />}{" "}
          {(type === "Instruction" || type === "Assignment") && (
            <AssignmentOrIntroductionForm />
          )}
        </>
      ) : (
        <h4>Select lesson type first</h4>
      )}
    </div>
  );
};

export default CreateLesson;
