import { Modal } from "antd/lib";

type Props = {
  moduleId: string;
  moduleName: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const ViewLessonsModal = ({ open, setOpen, moduleName, moduleId }: Props) => {
  return (
    <Modal
      footer={false}
      open={open}
      onCancel={() => setOpen(false)}
      title={`Lessons for: ${moduleName}`}
    >
      <h2>{moduleName}</h2>
      <h2>{moduleId}</h2>
    </Modal>
  );
};

export default ViewLessonsModal;
