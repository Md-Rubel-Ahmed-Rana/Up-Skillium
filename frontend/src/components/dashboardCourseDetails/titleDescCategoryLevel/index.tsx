/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourse } from "@/types/course.type";
import { Button, Descriptions, Input } from "antd/lib";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

type Props = {
  course: ICourse;
};

const TitleDescCategoryLevel = ({ course }: Props) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const [isEdit, setIsEdit] = useState(false);
  const [newValues, setNewValues] = useState({
    title: course?.title || "",
    category: course?.category || "",
    level: course?.level || "",
    status: course?.status || "",
    duration: course?.duration || "",
    description: course?.description || "",
  });
  const handleInputChange = (field: string, value: any) => {
    setNewValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span className={!isLargeDevice && isEdit ? "hidden" : "block"}>
            Title, Category, Level, Description
          </span>
          {isEdit ? (
            <>
              <Button iconPosition="end" type="primary">
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
      <Descriptions.Item label="Title" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input type="text" value={newValues.title} />
        ) : (
          <div className="flex items-center gap-2">{course?.title}</div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Category" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
          />
        ) : (
          <div className="flex items-center gap-2">{course?.category}</div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Level" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.level}
            onChange={(e) => handleInputChange("level", e.target.value)}
          />
        ) : course?.level ? (
          <div className="flex items-center gap-2">{course?.level}</div>
        ) : (
          "Empty"
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Status" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.status}
            onChange={(e) => handleInputChange("status", e.target.value)}
          />
        ) : course?.status ? (
          <div className="flex items-center gap-2">{course?.status}</div>
        ) : (
          "Empty"
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Duration" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input
            type="text"
            value={newValues.duration}
            onChange={(e) => handleInputChange("duration", e.target.value)}
          />
        ) : course?.duration ? (
          <div className="flex items-center gap-2">{course?.duration}</div>
        ) : (
          "Empty"
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Description" span={isLargeDevice ? 1 : 2}>
        {isEdit ? (
          <Input.TextArea
            value={newValues.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        ) : (
          course?.description || "Empty"
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default TitleDescCategoryLevel;
