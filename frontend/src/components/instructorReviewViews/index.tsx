import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllReviewsByReviewToQuery } from "@/features/review";
import { IReview } from "@/types/review.type";
import { IUser } from "@/types/user.type";
import { Table, TableProps, Tooltip } from "antd/lib";

const InstructorReviewViews = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetAllReviewsByReviewToQuery({
    reviewToId: user?.id,
    limit: 100,
    page: 1,
  });

  const reviews = (data?.data?.reviews as IReview[]) || [];

  const columns: TableProps<IReview>["columns"] = [
    {
      title: "Reviewer",
      dataIndex: "reviewer",
      key: "reviewer",
      render: (reviewer: IReview["reviewer"]) => (
        <div className="flex items-center gap-2">
          <img
            src={reviewer?.image}
            alt={reviewer?.name}
            className="w-8 h-8 rounded-full"
          />
          <span>{reviewer?.name}</span>
        </div>
      ),
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      render: (feedback: string) => (
        <Tooltip title={feedback}>
          <span className="truncate max-w-[200px]">{feedback}</span>
        </Tooltip>
      ),
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <span className="font-medium">{rating} / 5</span>
      ),
    },
  ];

  return (
    <div className="mt-3">
      <h2 className="text-lg lg:text-2xl font-semibold mb-3">Reviews</h2>
      <Table
        dataSource={reviews}
        columns={columns}
        rowKey="id"
        bordered
        loading={isLoading}
        className="shadow-md rounded-lg w-full min-w-[900px]"
      />
    </div>
  );
};

export default InstructorReviewViews;
