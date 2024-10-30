/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUpdateUserAddressMutation } from "@/features/user";
import { IUser } from "@/types/user.type";
import { Button, Descriptions, Input } from "antd/lib";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";

type Props = {
  user: IUser;
};

const UserAddress = ({ user }: Props) => {
  const [updateAddress, { isLoading }] = useUpdateUserAddressMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [newValues, setNewValues] = useState({
    street: user?.address?.street || "",
    city: user?.address?.city || "",
    state: user?.address?.state || "",
    country: user?.address?.country || "",
  });

  const handleInputChange = (field: string, value: any) => {
    setNewValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleUpdateInfo = async () => {
    try {
      const response: any = await updateAddress({
        ...newValues,
        id: user?.id,
      });
      if (response?.data?.statusCode === 200) {
        toast.success(
          response?.data?.message || "Address updated successfully"
        );
      } else {
        toast.error(
          response?.error?.message ||
            response?.error?.data?.message ||
            "Failed to update address"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "There was a server-side error occurred");
    }
    setIsEdit(false);
  };
  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span>Address</span>
          {isEdit ? (
            <>
              <Button
                disabled={isLoading}
                onClick={handleUpdateInfo}
                loading={isLoading}
                iconPosition="end"
                type="primary"
              >
                {isLoading ? "Loading" : "Save changes"}
              </Button>
              <Button disabled={isLoading} onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <FaEdit
              onClick={() => setIsEdit(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      }
      column={2}
      bordered
      className="mt-4 pb-4 border-b"
    >
      <Descriptions.Item label="Street" span={1}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.street}
            onChange={(e) => handleInputChange("street", e.target.value)}
          />
        ) : (
          <p> {user?.address?.street || "Empty"}</p>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="City" span={1}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
          />
        ) : (
          <p> {user?.address?.city || "Empty"}</p>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="State" span={1}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.state}
            onChange={(e) => handleInputChange("state", e.target.value)}
          />
        ) : (
          <p> {user?.address?.state || "Empty"}</p>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Country" span={1}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
          />
        ) : (
          <p> {user?.address?.country || "Empty"}</p>
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default UserAddress;
