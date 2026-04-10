import { ICourse } from "@/types/course.type";
import makeCategoryAsUrl from "@/utils/makeCategoryAsUrl";
import { Button } from "antd/lib";
import Link from "next/link";

type Props = {
  categories: string[];
  course: ICourse;
};

const AvailableCategories = ({ categories, course }: Props) => {
  return (
    <div>
      <h3 className="text-lg lg:text-4xl font-bold">Explore categories</h3>
      <div className="flex lg:flex-wrap lg:gap-4 gap-2 mt-2 w-full lg:w-auto overflow-x-auto mb-4">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/courses/category/${makeCategoryAsUrl(category)}?category=${
              course?.category
            }&courseTitle=${course?.title}&description=${
              course?.description
            }&techs=${course?.technologies?.join(
              "-"
            )}&tags=${course?.tags?.join("-")}&courseId=${course?.id}`}
          >
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg"
              type="primary"
            >
              {category}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AvailableCategories;
