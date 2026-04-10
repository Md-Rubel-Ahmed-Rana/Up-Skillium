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
      <Select.Option value="video">Video</Select.Option>
      <Select.Option value="instruction">Instruction</Select.Option>
      <Select.Option value="quiz">Quiz</Select.Option>
      <Select.Option value="assignment">Assignment</Select.Option>
    </Select>
  );
};

export default SelectLessonType;
