import { useMediaQuery } from "react-responsive";
import { Button, Descriptions, Input, Tag, message } from "antd/lib";
import { useState } from "react";
import { FaEdit, FaPlusCircle, FaTrashAlt } from "react-icons/fa";

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

  const handleSave = () => {
    console.log(courseId);
    console.log("Updated Tags & Technologies:", newValues);
    message.success("Tags and technologies updated successfully!");
    setIsEdit(false);
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
                iconPosition="end"
                type="primary"
                onClick={handleSave}
                className="bg-green-500 text-white"
              >
                Save Changes
              </Button>
              <Button
                onClick={() => {
                  setNewValues({ tags, technologies });
                  setIsEdit(false);
                }}
              >
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
