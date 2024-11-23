import { IEducation } from "@/types/education.type";
import { Button } from "antd/lib";
import { useState } from "react";
import AddOrEditEducationModal from "./AddOrEditEducationModal";

type Props = {
  education: IEducation;
};

const EducationActions = ({ education }: Props) => {
  const [isEditEducation, setIsEditEducation] = useState(false);

  return (
    <>
      <div className="flex space-x-3">
        <Button onClick={() => setIsEditEducation(true)} type="primary">
          Edit
        </Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </div>
      <AddOrEditEducationModal
        actionType="edit"
        education={education}
        open={isEditEducation}
        setOpen={setIsEditEducation}
      />
    </>
  );
};

export default EducationActions;
