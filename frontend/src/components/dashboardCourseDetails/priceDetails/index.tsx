/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from "react-responsive";
import { Button, Descriptions, Input, message } from "antd/lib";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useUpdateCoursePriceMutation } from "@/features/course";
import toast from "react-hot-toast";

type Props = {
  courseId: string;
  original: number;
  discount: number;
  salePrice: number;
};

const CoursePriceDetails = ({
  courseId,
  original,
  discount,
  salePrice,
}: Props) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const [isEdit, setIsEdit] = useState(false);
  const [updatePrice, { isLoading }] = useUpdateCoursePriceMutation();
  const [newValues, setNewValues] = useState({
    original: original || 0,
    discount: discount || 0,
    salePrice: salePrice || original - (original * discount) / 100,
  });

  const handleInputChange = (field: string, value: any) => {
    const parsedValue = parseFloat(value) || 0;

    if (field === "discount") {
      if (parsedValue < 0 || parsedValue > 100) {
        message.error("Discount must be between 0 and 100.");
        return;
      }
      const calculatedSalePrice =
        newValues.original - (newValues.original * parsedValue) / 100;
      setNewValues((prevValues) => ({
        ...prevValues,
        discount: parsedValue,
        salePrice: parseFloat(calculatedSalePrice.toFixed(2)),
      }));
    } else if (field === "original") {
      const calculatedSalePrice =
        parsedValue - (parsedValue * newValues.discount) / 100;
      setNewValues((prevValues) => ({
        ...prevValues,
        original: parsedValue,
        salePrice: parseFloat(calculatedSalePrice.toFixed(2)),
      }));
    }
  };

  const handleUpdateCoursePrice = async () => {
    try {
      const result: any = await updatePrice({
        courseId: courseId,
        data: newValues,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result.data.message || "Course price updated successfully!"
        );
      } else {
        toast.error(
          result?.data?.error?.message ||
            result?.error?.data?.message ||
            result?.error?.message ||
            "Failed to update course price"
        );
      }
      setIsEdit(false);
    } catch (error: any) {
      setIsEdit(false);
      toast.error(`Failed to update course price. Error: ${error?.message}`);
    }
  };

  const handleEdit = () => {
    setNewValues({
      original: original || 0,
      discount: discount || 0,
      salePrice: salePrice || original - (original * discount) / 100,
    });
    setIsEdit(true);
  };

  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span className={!isLargeDevice && isEdit ? "hidden" : "block"}>
            Course Price Details
          </span>
          {isEdit ? (
            <>
              <Button
                loading={isLoading}
                disabled={isLoading}
                iconPosition="end"
                size="small"
                type="primary"
                onClick={handleUpdateCoursePrice}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                disabled={isLoading}
                size="small"
                onClick={() => {
                  setIsEdit(false);
                  setNewValues({
                    original,
                    discount,
                    salePrice,
                  });
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <FaEdit onClick={handleEdit} className="cursor-pointer" />
          )}
        </div>
      }
      column={3}
      bordered
      className="mt-4 pb-4"
    >
      <Descriptions.Item label="Original Price $" span={isLargeDevice ? 1 : 3}>
        {isEdit ? (
          <Input
            type="number"
            min={0}
            value={newValues.original}
            onChange={(e) => handleInputChange("original", e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-2">${original}</div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Discount %" span={isLargeDevice ? 1 : 3}>
        {isEdit ? (
          <Input
            type="number"
            min={0}
            max={100}
            value={newValues.discount}
            onChange={(e) => handleInputChange("discount", e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-2">{discount}%</div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Sale Price $" span={isLargeDevice ? 1 : 3}>
        {isEdit ? (
          <Input type="text" value={newValues.salePrice} readOnly disabled />
        ) : (
          <div className="flex items-center gap-2">${salePrice}</div>
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default CoursePriceDetails;
