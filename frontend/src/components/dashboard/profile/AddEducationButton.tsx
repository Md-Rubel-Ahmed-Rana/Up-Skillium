import { Button } from "antd/lib";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AddOrEditEducationModal from "./AddOrEditEducationModal";

const AddEducationButton = () => {
  const [isAddEducation, setIsAddEducation] = useState(false);
  return (
    <>
      <Button
        size="small"
        icon={<FaPlus />}
        iconPosition="start"
        type="primary"
        onClick={() => setIsAddEducation(true)}
      >
        Add
      </Button>
      <AddOrEditEducationModal
        actionType="add"
        open={isAddEducation}
        setOpen={setIsAddEducation}
      />
    </>
  );
};

export default AddEducationButton;
