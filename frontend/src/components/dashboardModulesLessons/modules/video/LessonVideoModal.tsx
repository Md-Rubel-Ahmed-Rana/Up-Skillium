import { Modal } from "antd/lib";
import ReactPlayer from "react-player";

type Props = {
  videoUrl: string;
  title: string;
  open: boolean;
  setOpen: (open: boolean) => void;
};

const LessonVideoModal = ({ videoUrl, open, setOpen, title }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal
      title={<h3 className="font-semibold text-lg">{title}</h3>}
      open={open}
      onCancel={handleClose}
      footer={null}
      centered
      width={800}
      className="rounded-lg overflow-hidden"
    >
      {open && (
        <div className="relative w-full h-0 pb-[56.25%] bg-black rounded-lg overflow-hidden shadow-lg">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            className="absolute top-0 left-0"
          />
        </div>
      )}
    </Modal>
  );
};

export default LessonVideoModal;
