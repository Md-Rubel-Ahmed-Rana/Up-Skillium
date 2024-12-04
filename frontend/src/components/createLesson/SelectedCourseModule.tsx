import { useRouter } from "next/router";

const SelectedCourseModule = () => {
  const { query } = useRouter();
  const courseTitle = query?.courseName as string;
  const moduleName = query?.moduleName as string;
  const type = query?.type as string;

  return (
    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
      <h2>
        <span className="text-lg font-semibold"> Course: </span>{" "}
        {courseTitle || "Not selected"}
      </h2>
      <h2>
        <span className="text-md font-semibold"> Module: </span>
        {moduleName || "Not selected"}
      </h2>
      <h2>
        <span className="text-md font-semibold">Lesson Type: </span>
        {type || "Not selected"}
      </h2>
    </div>
  );
};

export default SelectedCourseModule;
