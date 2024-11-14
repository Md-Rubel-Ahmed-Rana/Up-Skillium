import { ILesson } from "@/types/lesson.type";
import { useForm } from "react-hook-form";
import { Button, Input } from "antd/lib";

type Props = {
  lesson: ILesson;
};

const VideoLessonUpdate = ({ lesson }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILesson>();

  const onSubmit = (data: ILesson) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block mb-1 text-sm font-medium">
          Lesson Title
        </label>
        <Input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Enter lesson title"
          className="w-full"
          value={lesson?.title}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Serial */}
      <div>
        <label htmlFor="serial" className="block mb-1 text-sm font-medium">
          Serial
        </label>
        <Input
          id="serial"
          type="number"
          {...register("serial", {
            required: "Serial is required",
            valueAsNumber: true,
          })}
          placeholder="Enter lesson serial"
          className="w-full"
          value={lesson?.serial}
        />
        {errors.serial && (
          <p className="text-red-500 text-sm mt-1">{errors.serial.message}</p>
        )}
      </div>

      {/* Video URL */}
      <div>
        <label htmlFor="videoUrl" className="block mb-1 text-sm font-medium">
          Video URL
        </label>
        <Input.TextArea
          id="videoUrl"
          {...register("videoUrl", { required: "Video URL is required" })}
          placeholder="Enter video URL"
          className="w-full"
          value={lesson?.videoUrl}
        />
        {errors.videoUrl && (
          <p className="text-red-500 text-sm mt-1">{errors.videoUrl.message}</p>
        )}
      </div>

      {/* Video Length */}
      <div>
        <label htmlFor="videoLength" className="block mb-1 text-sm font-medium">
          Video Length (minutes)
        </label>
        <Input
          id="videoLength"
          type="number"
          {...register("videoLength", {
            required: "Video length is required",
            valueAsNumber: true,
          })}
          placeholder="Enter video length in seconds"
          className="w-full"
          value={lesson?.videoLength}
        />
        {errors.videoLength && (
          <p className="text-red-500 text-sm mt-1">
            {errors.videoLength.message}
          </p>
        )}
      </div>

      <Button
        type="primary"
        htmlType="submit"
        disabled={isSubmitting}
        className="w-full mt-4"
      >
        {isSubmitting ? "Updating..." : "Update Lesson"}
      </Button>
    </form>
  );
};

export default VideoLessonUpdate;
