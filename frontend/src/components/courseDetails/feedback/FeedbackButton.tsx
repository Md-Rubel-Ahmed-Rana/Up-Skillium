import { Button } from "antd/lib";

type Props = {
  feedbackType: "Course" | "Instructor";
  buttonType: "dashed" | "default" | "text" | "primary";
  buttonStyles?: string;
  setOpen: (value: boolean) => void;
  setTitle: (value: string) => void;
};

const FeedbackButton = ({
  feedbackType,
  buttonType,
  buttonStyles,
  setOpen,
  setTitle,
}: Props) => {
  const handleFeedback = () => {
    setOpen(true);
    setTitle(feedbackType);
  };
  return (
    <div>
      <Button
        onClick={handleFeedback}
        type={buttonType}
        size="middle"
        className={buttonStyles}
      >
        Feedback to {feedbackType}
      </Button>
    </div>
  );
};

export default FeedbackButton;
