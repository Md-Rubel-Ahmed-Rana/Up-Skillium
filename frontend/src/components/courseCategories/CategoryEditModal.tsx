import { useUpdateCategoryMutation } from "@/features/category";
import { ICategory } from "@/types/category.type";
import { Button, Input, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  category: ICategory;
};

const CategoryEditModal = ({ category }: Props) => {
  const [open, setOpen] = useState(false);
  const [updateCategory, { isLoading }] = useUpdateCategoryMutation();
  const [editedName, setEditedName] = useState(category?.name || "");

  const handleEditCategory = async () => {
    try {
      const result: any = await updateCategory({
        categories: [{ ...category, name: editedName }],
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Category updated successfully!"
        );
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to edit category."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to edit category. Error: ${error?.message}`);
    }
  };

  const isNameEdited =
    category?.name?.toLowerCase().trim() === editedName.toLowerCase().trim();

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Edit
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Edit Category"
        okText={`${isLoading ? "Saving..." : "Save changes"}`}
        onOk={handleEditCategory}
        okButtonProps={{
          disabled: isLoading || isNameEdited || editedName === "",
          loading: isLoading,
          iconPosition: "end",
        }}
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
      >
        <div>
          <Input
            name="category"
            onChange={(e) => setEditedName(e.target.value)}
            value={editedName}
          />
        </div>
      </Modal>
    </>
  );
};

export default CategoryEditModal;
