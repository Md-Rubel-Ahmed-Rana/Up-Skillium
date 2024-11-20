import { IModuleOutline } from "@/types/courseOutline.type";
import { Button } from "antd/lib";
import { v4 as uuidv4 } from "uuid";

type Props = {
  modules: IModuleOutline[];
  setModules: (modules: IModuleOutline[]) => void;
};

const AddNewModuleButton = ({ modules, setModules }: Props) => {
  const handleAddNewModule = () => {
    const newModule: IModuleOutline = {
      id: uuidv4(),
      name: "",
      serial: modules.length + 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const newModules = [...modules, newModule];
    setModules(newModules);
  };

  return (
    <Button type="primary" onClick={handleAddNewModule}>
      Add New Module
    </Button>
  );
};

export default AddNewModuleButton;
