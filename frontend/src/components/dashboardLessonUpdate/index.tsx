import { useRouter } from "next/router";

const DashboardLessonUpdate = () => {
  const { query } = useRouter();
  const lessonId = query?.lessonId as string;
  const lessonTitle = query?.lessonTitle as string;
  return (
    <div>
      <h1>DashboardLessonUpdate</h1>
      <h2>{lessonTitle}</h2>
      <h2>{lessonId}</h2>
    </div>
  );
};

export default DashboardLessonUpdate;
