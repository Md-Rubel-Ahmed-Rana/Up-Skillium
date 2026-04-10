import { Pagination } from "antd/lib";

type Props = {
  totalReviews: number;
  setPagination: (values: { page: number; limit: number }) => void;
};

const ReviewPagination = ({ totalReviews, setPagination }: Props) => {
  const handlePagination = (pageNumber: number, pageSize: number) => {
    setPagination({ page: pageNumber, limit: pageSize });
  };
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        defaultCurrent={1}
        pageSize={5}
        total={totalReviews}
        onChange={(pageNumber, pageSize) =>
          handlePagination(pageNumber, pageSize)
        }
      />
    </div>
  );
};

export default ReviewPagination;
