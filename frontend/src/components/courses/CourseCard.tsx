/* eslint-disable @typescript-eslint/no-explicit-any */
import dynamic from "next/dynamic";

const Card = dynamic(() => import("antd").then((mod) => mod.Card), {
  ssr: false,
});
const Space = dynamic(() => import("antd").then((mod) => mod.Space), {
  ssr: false,
});
const Button = dynamic(() => import("antd").then((mod) => mod.Button), {
  ssr: false,
});

type Props = {
  course: any;
};

const CourseCard = ({ course }: Props) => {
  return (
    <div className="mx-auto max-w-sm bg-gradient-to-br from-gray-50 via-slate-100 to-gray-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <Space direction="vertical" size={16} className="w-full">
        <Card
          title={course.title}
          style={{
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            overflow: "hidden",
          }}
          headStyle={{
            backgroundColor: "#f9fafb",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
          bodyStyle={{ padding: "1rem" }}
          hoverable
        >
          <p className="text-gray-600 font-semibold text-sm">
            {course.category}
          </p>
          <p className="text-gray-800 text-lg mt-2 mb-4">
            {course.description}
          </p>
          <Button color="default" variant="solid">
            Details
          </Button>
        </Card>
      </Space>
    </div>
  );
};

export default CourseCard;
