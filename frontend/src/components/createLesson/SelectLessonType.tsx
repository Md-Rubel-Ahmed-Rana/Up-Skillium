import { Select } from "antd/lib";
import { useRouter } from "next/router";

const SelectLessonType = () => {
  const router = useRouter();
  const handleSelectType = (type: string) => {
    router.push({ query: { ...router.query, type: type } });
  };
  return (
    <Select
      onChange={handleSelectType}
      placeholder="Select lesson type"
      className="w-full"
    >
      <Select.Option value="Video">Video</Select.Option>
      <Select.Option value="Instruction">Instruction</Select.Option>
      <Select.Option value="Quiz">Quiz</Select.Option>
      <Select.Option value="Assignment">Assignment</Select.Option>
    </Select>
  );
};

export default SelectLessonType;
