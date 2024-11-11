import { Button } from "antd/lib";
import { AiOutlineExclamationCircle } from "react-icons/ai";

type Props = {
  refetch: () => void;
};

const NoLessonFoundError = ({ refetch }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] p-5 bg-gray-100 rounded-lg shadow-md text-center">
      <AiOutlineExclamationCircle className="text-red-500 text-4xl mb-3" />
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        Lesson Not Found
      </h3>
      <p className="text-gray-600 mb-4">
        We couldn&apos;t find the lesson you&apos;re looking for. It might have
        been removed or is temporarily unavailable.
      </p>
      <Button type="primary" onClick={() => refetch()} className="px-4 py-2">
        Reload
      </Button>
    </div>
  );
};

export default NoLessonFoundError;
