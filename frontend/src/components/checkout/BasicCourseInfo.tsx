/* eslint-disable @next/next/no-img-element */
import { Tag } from "antd/lib";

type Props = {
  title: string;
  image: string;
  category: string;
  technologies: string[];
};

const BasicCourseInfo = ({ title, category, image, technologies }: Props) => {
  return (
    <div className="mb-6">
      <h1 className="text-lg lg:text-2xl font-semibold mb-2">{title}</h1>
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
      <h3 className="text-gray-600 font-semibold text-md lg:text-lg block">
        {category}
      </h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies?.map((tech) => (
          <Tag color="geekblue" key={tech}>
            {tech}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default BasicCourseInfo;
