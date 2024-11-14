import { IUser } from "@/types/user.type";
import { Button, Descriptions, Input, DatePicker, Select } from "antd/lib";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaEdit } from "react-icons/fa";
import dayjs from "dayjs";
import { useUpdateUserBasicInfoMutation } from "@/features/user";
import toast from "react-hot-toast";
import { useMediaQuery } from "react-responsive";

const { Option } = Select;

type Props = {
  user: IUser;
};

const BasicInformation = ({ user }: Props) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const [isEdit, setIsEdit] = useState(false);
  const [updateInfo, { isLoading }] = useUpdateUserBasicInfoMutation();
  const [newValues, setNewValues] = useState({
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    dateOfBirth: user?.dateOfBirth ? dayjs(user.dateOfBirth) : null,
    gender: user?.gender || "",
  });

  const handleInputChange = (field: string, value: any) => {
    setNewValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleUpdateInfo = async () => {
    try {
      const updatedValues = {
        ...newValues,
        id: user.id,
        dateOfBirth: newValues.dateOfBirth
          ? newValues.dateOfBirth.toDate()
          : null,
      };

      const response: any = await updateInfo(updatedValues);
      if (response?.data?.statusCode === 200) {
        toast.success(
          response?.data?.message || "Basic information updated successfully"
        );
      } else {
        toast.error(
          response?.error?.message ||
            response?.error?.data?.message ||
            "Failed to update info"
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
          <span className={!isLargeDevice && isEdit ? "hidden" : "block"}>
            Basic Information
          </span>
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
      <Descriptions.Item label="Email" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input type="email" value={newValues.email} readOnly disabled />
        ) : (
          <div className="flex items-center gap-2">
            <CiMail />
            {user?.email}
          </div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Phone" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-2">
            <FaPhone />
            {user?.phoneNumber}
          </div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Date of Birth" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <DatePicker
            value={newValues.dateOfBirth}
            onChange={(date) => handleInputChange("dateOfBirth", date)}
          />
        ) : user?.dateOfBirth ? (
          new Date(user.dateOfBirth).toLocaleDateString()
        ) : (
          "Empty"
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Gender" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Select
            value={newValues.gender}
            onChange={(value) => handleInputChange("gender", value)}
            style={{ width: "100%" }}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Other">Other</Option>
          </Select>
        ) : (
          user?.gender || "Empty"
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default BasicInformation;
