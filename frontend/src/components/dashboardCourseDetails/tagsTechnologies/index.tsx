import { useMediaQuery } from "react-responsive";
import { Button, Descriptions, Input, Tag } from "antd/lib";
import { useState } from "react";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { useUpdateCourseTagsTechsMutation } from "@/features/course";
import toast from "react-hot-toast";

type Props = {
  courseId: string;
  tags?: string[];
  technologies?: string[];
};

const TagsTechnologies = ({
  courseId,
  tags = [],
  technologies = [],
}: Props) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const [isEdit, setIsEdit] = useState(false);
  const [updateTagsTechs, { isLoading }] = useUpdateCourseTagsTechsMutation();
  const [newValues, setNewValues] = useState({
    tags: [...tags],
    technologies: [...technologies],
  });

  const handleAdd = (field: "tags" | "technologies") => {
    setNewValues((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };

  const handleRemove = (field: "tags" | "technologies", index: number) => {
    setNewValues((prev) => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (
    field: "tags" | "technologies",
    index: number,
    value: string
  ) => {
    setNewValues((prev) => {
      const updatedField = [...prev[field]];
      updatedField[index] = value;
      return { ...prev, [field]: updatedField };
    });
  };

  const handleUpdateTagsTechs = async () => {
    try {
      const result: any = await updateTagsTechs({
        courseId: courseId,
        data: newValues,
      });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Course tags & techs updated successfully!"
        );
      } else {
        toast.error(
          result?.data?.error?.message ||
            result?.error?.data?.message ||
            result?.error?.message ||
            "Failed to update course tags & techs"
        );
      }
      setIsEdit(false);
    } catch (error: any) {
      setIsEdit(false);
      toast.error(
        `Failed to update course tags & techs. Error: ${error?.message}`
      );
    }
  };

  const handleEdit = () => {
    setNewValues({
      tags: [...tags],
      technologies: [...technologies],
    });
    setIsEdit(true);
  };

  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span className={!isLargeDevice && isEdit ? "hidden" : "block"}>
            Tags & Technologies
          </span>
          {isEdit ? (
            <>
              <Button
                size="small"
                iconPosition="end"
                disabled={isLoading}
                loading={isLoading}
                type="primary"
                onClick={handleUpdateTagsTechs}
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                disabled={isLoading}
                size="small"
                onClick={() => {
                  setNewValues({ tags, technologies });
                  setIsEdit(false);
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
      column={1}
      bordered
      className="mt-4 pb-4"
    >
      <Descriptions.Item label="Tags">
        {isEdit ? (
          <div className="space-y-2">
            {newValues?.tags?.map((tag, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={tag}
                  placeholder="Enter a tag"
                  onChange={(e) => handleChange("tags", index, e.target.value)}
                />
                <FaTrashAlt
                  className="cursor-pointer text-red-500"
                  onClick={() => handleRemove("tags", index)}
                />
              </div>
            ))}
            <Button
              type="dashed"
              onClick={() => handleAdd("tags")}
              icon={<FaPlusCircle />}
            >
              Add Tag
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags?.map((tag, index) => (
              <Tag color="blue" key={index}>
                {tag}
              </Tag>
            ))}
          </div>
        )}
      </Descriptions.Item>

      <Descriptions.Item label="Technologies">
        {isEdit ? (
          <div className="space-y-2">
            {newValues?.technologies?.map((tech, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  value={tech}
                  placeholder="Enter a technology"
                  onChange={(e) =>
                    handleChange("technologies", index, e.target.value)
                  }
                />
                <FaTrashAlt
                  className="cursor-pointer text-red-500"
                  onClick={() => handleRemove("technologies", index)}
                />
              </div>
            ))}
            <Button
              type="dashed"
              onClick={() => handleAdd("technologies")}
              icon={<FaPlusCircle />}
            >
              Add Technology
            </Button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {technologies?.map((tech, index) => (
              <Tag color="green" key={index}>
                {tech}
              </Tag>
            ))}
          </div>
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default TagsTechnologies;
