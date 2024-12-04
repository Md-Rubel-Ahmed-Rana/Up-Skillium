import { useGetAllCategoriesQuery } from "@/features/category";
import { ICategory } from "@/types/category.type";
import { Form, Select } from "antd/lib";

const CourseCategory = () => {
  const { data } = useGetAllCategoriesQuery({});
  const categories = (data?.data as ICategory[]) || [];
  return (
    <Form.Item
      label="Category"
      name="category"
      rules={[{ required: true, message: "Please select a category" }]}
    >
      <Select placeholder="Select category" className="w-full">
        {categories?.map((category) => (
          <Select.Option key={category?.id} value={category?.name}>
            {category?.name}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CourseCategory;
