import { useGetAllCategoriesQuery } from "@/features/category";
import { ICategory } from "@/types/category.type";
import { Button, Table, TableProps } from "antd/lib";

const CourseCategories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const categories = (data?.data as ICategory[]) || [];

  const catData: ICategory[] = Array.from({ length: 50 }).map((_, index) => ({
    id: `Cat id: ${index + 1}`,
    name: `Cat name: ${index + 1}`,
    createdAt: new Date(),
    updatedAt: new Date(),
  }));

  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Category Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: ["createdAt"],
      key: "createdAt",
      render: (createdAt: Date) => (
        <span className="text-blue-500">
          {new Date(createdAt).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Updated At",
      dataIndex: ["updatedAt"],
      key: "updatedAt",
      render: (updatedAt: Date) => (
        <span className="text-blue-500">
          {new Date(updatedAt).toLocaleString()}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, category: ICategory) => (
        <div className="flex items-center gap-2">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">
        Manage Categories
      </h2>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={catData}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
        className="shadow-md rounded-lg w-full min-w-[900px]"
      />
    </div>
  );
};

export default CourseCategories;
