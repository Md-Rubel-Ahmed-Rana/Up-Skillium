import { useDeleteCategoryMutation } from "@/features/category";
import { ICategory } from "@/types/category.type";
import { Button, Modal } from "antd/lib";
import { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  category: ICategory;
};

const CategoryDeleteModal = ({ category }: Props) => {
  const [open, setOpen] = useState(false);
  const [deleteCategory, { isLoading }] = useDeleteCategoryMutation();

  const handleDeleteCategory = async () => {
    try {
      const result: any = await deleteCategory({
        ids: [category?.id],
      });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Category delete successfully!");
        setOpen(false);
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete category."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete category. Error: ${error?.message}`);
    }
  };

  return (
    <>
      <Button danger type="primary" onClick={() => setOpen(true)}>
        Delete
      </Button>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Delete Category"
        okText={`${isLoading ? "Deleting..." : "Delete"}`}
        onOk={handleDeleteCategory}
        okButtonProps={{
          disabled: isLoading,
          loading: isLoading,
          iconPosition: "end",
        }}
        cancelButtonProps={{ disabled: isLoading }}
        maskClosable={!isLoading}
      >
        <p className="text-gray-600 text-md my-5 font-semibold">
          Are you sure you want to delete the category : {category?.name}?
        </p>
      </Modal>
    </>
  );
};

export default CategoryDeleteModal;
