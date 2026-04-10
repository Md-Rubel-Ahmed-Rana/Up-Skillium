import { useCreateCategoryMutation } from "@/features/category";
import { Button, Form, Input, Modal, Tag } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";

const AddCategoryModal = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isCreateCategory, setIsCreateCategory] = useState(false);
  const [createCategory, { isLoading }] = useCreateCategoryMutation();

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
    }
  };

  const handleRemoveCategory = (category: string) => {
    setCategories(categories.filter((cat) => cat !== category));
  };

  const handleCreateCategory = async () => {
    const newCategories: { name: string }[] = categories?.map((category) => ({
      name: category,
    }));
    try {
      const result: any = await createCategory({ data: newCategories });
      if (result?.data?.statusCode === 201) {
        toast.success(
          result?.data?.message || "Categories created successfully!"
        );
        setIsCreateCategory(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to create category."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to create category. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button
        icon={<FaPlus />}
        size="small"
        onClick={() => setIsCreateCategory(true)}
        type="primary"
      >
        Add Category
      </Button>
      <Modal
        open={isCreateCategory}
        onCancel={() => setIsCreateCategory(false)}
        title="Create categories"
        onOk={handleCreateCategory}
        okText={isLoading ? "Creating..." : "Create"}
        cancelText="Cancel"
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
        okButtonProps={{
          disabled: isLoading,
          loading: isLoading,
          iconPosition: "end",
        }}
      >
        <Form layout="vertical" className="space-y-4">
          <Form.Item label="Category">
            <div className="flex items-center gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Enter new category"
                className="flex-grow"
                name="permission"
              />
              <Button type="primary" onClick={handleAddCategory}>
                Add
              </Button>
            </div>
          </Form.Item>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Tag
                key={category}
                closable
                onClose={() => handleRemoveCategory(category)}
                className="bg-blue-100 text-blue-700"
              >
                {category}
              </Tag>
            ))}
            {categories.length === 0 && (
              <p className="text-gray-500">No categories added yet.</p>
            )}
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
