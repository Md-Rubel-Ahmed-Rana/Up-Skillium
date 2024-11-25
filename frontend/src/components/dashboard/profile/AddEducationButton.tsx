import { Button } from "antd/lib";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const AddEducationButton = () => {
  return (
    <Link href={"/dashboard/add-education"}>
      <Button
        size="small"
        icon={<FaPlus />}
        iconPosition="start"
        type="primary"
      >
        Add
      </Button>
    </Link>
  );
};

export default AddEducationButton;
