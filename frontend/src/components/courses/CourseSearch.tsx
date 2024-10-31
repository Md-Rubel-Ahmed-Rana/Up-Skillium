import { Input } from "antd";
import { IoSearch } from "react-icons/io5";

const CourseSearch = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-12 lg:space-y-4 space-y-2 p-2">
      <h1 className="text-lg md:text-3xl font-bold text-gray-800">
        Find Your Next Learning Adventure
      </h1>
      <p className="text-gray-500 text-center max-w-lg">
        Explore a variety of courses to gain new skills, enhance your knowledge,
        and boost your career. Start searching to discover the perfect course
        for you.
      </p>
      <Input
        type="search"
        placeholder="Search your favorite course..."
        prefix={<IoSearch className="text-gray-400" />}
        className="w-full max-w-md px-4 py-2 rounded-lg shadow-md"
        allowClear
        size="large"
      />
    </div>
  );
};

export default CourseSearch;
