import { IEducation } from "@/types/education.type";
import { Button } from "antd/lib";
import Link from "next/link";
import EducationDeleteModal from "./EducationDeleteModal";

type Props = {
  education: IEducation;
};

const EducationActions = ({ education }: Props) => {
  return (
    <>
      <div className="flex space-x-3">
        <Link
          href={`/dashboard/edit-education/${education?.id}?institution=${education?.institution}&user=${education?.user?.name}`}
        >
          <Button type="primary">Edit</Button>
        </Link>
        <EducationDeleteModal education={education} />
      </div>
    </>
  );
};

export default EducationActions;
