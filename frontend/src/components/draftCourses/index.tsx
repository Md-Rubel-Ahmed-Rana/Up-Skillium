import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { Button, Table, TableProps } from "antd/lib";
import Link from "next/link";

type TableDataType = {
  id: string;
  image: string;
  title: string;
  price: string;
  tags: string;
  technologies: string;
  category: string;
  level: string;
  duration: string;
  status: string;
  actions: JSX.Element[];
};

const DraftCourses = () => {
  const { data, isLoading } = useGetAllCoursesQuery({
    filters: { status: "draft" },
  });
  const courses = data?.data as ICourse[];
  const tableDataCourse: TableDataType[] = courses?.map((course) => ({
    id: course?.id,
    image: course?.image,
    title: course?.title,
    price: `$${course?.price.salePrice} (Original: $${course?.price.original}, Discount: ${course?.price.discount}%)`,
    tags: course?.tags.join(", "),
    technologies: course?.technologies?.join(", "),
    category: course?.category,
    level: course?.level,
    duration: course?.duration,
    status: course?.status,
    actions: [
      <Link
        href={`/dashboard/course/modules-lessons/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
        key="1"
      >
        <Button
          type="default"
          className="w-[90%] bg-yellow-500 hover:bg-yellow-600 text-white"
        >
          Classes
        </Button>
      </Link>,
      <Link
        href={`/dashboard/course/outlines/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
        key="2"
      >
        <Button className="w-[90%] bg-green-500 text-white" type="default">
          Outlines
        </Button>
      </Link>,
      <Link
        href={`/dashboard/course/details/${course?.id}?courseTitle=${course?.title}&category=${course?.category}&description=${course?.description}`}
        key="3"
      >
        <Button type="primary" className="w-[90%]">
          Details
        </Button>
      </Link>,
    ],
  }));

  const columns: TableProps<TableDataType>["columns"] = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={image}
          alt="Course"
          className="w-12 h-10 object-cover rounded-full"
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
    },
    {
      title: "Technologies",
      dataIndex: "technologies",
      key: "technologies",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Level",
      dataIndex: "level",
      key: "level",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded ${
            status === "active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      render: (actions) => <div className="flex flex-col gap-2">{actions}</div>,
    },
  ];

  return (
    <div className="mt-4">
      <h1 className="text-lg lg:text-2xl font-semibold mb-3">Draft courses</h1>
      <div className="overflow-x-auto w-full">
        <Table<TableDataType>
          columns={columns}
          dataSource={tableDataCourse}
          rowKey="id"
          pagination={{ pageSize: 5 }}
          bordered
          loading={isLoading}
          className="shadow-md rounded-lg w-full min-w-[900px]"
        />
      </div>
    </div>
  );
};

export default DraftCourses;
