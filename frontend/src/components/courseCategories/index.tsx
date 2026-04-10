import { useGetAllCategoriesQuery } from "@/features/category";
import { ICategory } from "@/types/category.type";
import { Table, TableProps } from "antd/lib";
import AddCategoryModal from "./AddCategoryModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import CategoryEditModal from "./CategoryEditModal";

const CourseCategories = () => {
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const categories = (data?.data as ICategory[]) || [];

  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Name",
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
          <CategoryEditModal category={category} />
          <CategoryDeleteModal category={category} />
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4 overflow-x-auto w-full">
      <div className="flex items-center gap-2">
        <h2 className="text-lg lg:text-2xl font-semibold mb-3">
          Manage Categories
        </h2>
        <AddCategoryModal />
      </div>
      <Table
        rowKey="id"
        columns={columns}
        dataSource={categories}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 10 }}
        className="shadow-md rounded-lg w-full min-w-[900px]"
      />
    </div>
  );
};

export default CourseCategories;
