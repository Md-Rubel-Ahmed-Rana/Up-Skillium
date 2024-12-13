import { Pagination } from "antd/lib";

type Props = {
  totalCourse: number;
  setPagination: (values: { page: number; limit: number }) => void;
};

const CoursePagination = ({ totalCourse, setPagination }: Props) => {
  const handlePagination = (pageNumber: number, pageSize: number) => {
    setPagination({ page: pageNumber, limit: pageSize });
  };
  return (
    <div className="flex justify-center mt-10">
      <Pagination
        defaultCurrent={1}
        pageSize={6}
        total={totalCourse}
        onChange={(pageNumber, pageSize) =>
          handlePagination(pageNumber, pageSize)
        }
      />
    </div>
  );
};

export default CoursePagination;
