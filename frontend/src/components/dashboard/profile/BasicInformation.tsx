/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUser } from "@/types/user.type";
import { Button, Descriptions, Input, DatePicker, Select } from "antd/lib";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { FaPhone, FaEdit } from "react-icons/fa";
import dayjs from "dayjs";

const { Option } = Select;

type Props = {
  user: IUser;
};

const BasicInformation = ({ user }: Props) => {
  const [isEdit, setIsEdit] = useState(false);
  const [newValues, setNewValues] = useState({
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    dateOfBirth: user?.dateOfBirth ? dayjs(user.dateOfBirth) : null,
    gender: user?.gender || "",
  });

  const handleInputChange = (field: string, value: any) => {
    setNewValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleUpdateInfo = () => {
    console.log("Updated Info:", newValues);
    setIsEdit(false);
  };

  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span>Basic Information</span>
          {isEdit ? (
            <>
              <Button onClick={handleUpdateInfo} type="primary">
                Save changes
              </Button>
              <Button onClick={() => setIsEdit(false)}>Cancel</Button>
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
      <Descriptions.Item label="Email" span={1}>
        {isEdit ? (
          <Input
            type="email"
            value={newValues.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-2">
            <CiMail />
            {user?.email}
          </div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Phone" span={1}>
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

      <Descriptions.Item label="Date of Birth" span={1}>
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

      <Descriptions.Item label="Gender" span={1}>
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
