import { useGetAllLessonsQuery } from "@/features/lesson";
import { ILesson } from "@/types/lesson.type";
import { Divider } from "antd/lib";
import LessonItem from "./LessonItem";
import LessonSearchContainer from "./LessonSearchContainer";

const LessonListContainer = () => {
  const { data } = useGetAllLessonsQuery({});
  const lessons = data?.data as ILesson[];
  return (
    <div className="border max-h-screen h-full overflow-y-auto rounded-md p-3 bg-gray-100">
      <h3 className="text-lg font-semibold text-center">
        Select lesson to update
      </h3>
      <LessonSearchContainer />
      <Divider className="my-2" />
      <div className="hidden lg:block">
        <ul className="flex flex-col gap-2">
          {lessons?.map((lesson) => (
            <LessonItem key={lesson?.id} lesson={lesson} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LessonListContainer;
