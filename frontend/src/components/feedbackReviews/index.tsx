import { useGetAllReviewsQuery } from "@/features/review";
import {
  IReview,
  IReviewTo,
  IReviewToCourse,
  IReviewToInstructor,
} from "@/types/review.type";
import { EditOutlined } from "@ant-design/icons/lib";

import { Button, Space, Table, Tooltip } from "antd/lib";
import { useState } from "react";
import FeedbackDeleteButton from "./FeedbackDeleteButton";
import FeedbackEditModal from "./FeedbackEditModal";

const FeedbackReviews = () => {
  const { data } = useGetAllReviewsQuery({});
  const feedbacks = data?.data as IReview[];
  const [isEditFeedback, setIsEditFeedback] = useState(false);
  const [editableFeedback, setEditableFeedback] = useState<IReview | null>(
    null
  );

  const handleEditFeedback = (feedback: IReview) => {
    setIsEditFeedback(true);
    setEditableFeedback(feedback);
  };

  const columns = [
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
    {
      title: "Reviewed To",
      dataIndex: "reviewTo",
      key: "reviewTo",
      render: (reviewTo: IReviewTo, record: IReview) => {
        const isInstructor = record?.reviewToModel === "User";
        return (
          <div className="flex items-center gap-2">
            <img
              src={reviewTo?.image}
              alt={
                isInstructor
                  ? (reviewTo as IReviewToInstructor)?.name
                  : (reviewTo as IReviewToCourse)?.title
              }
              className="w-8 h-8 rounded-full"
            />
            <span>
              {isInstructor
                ? (reviewTo as IReviewToInstructor)?.name
                : (reviewTo as IReviewToCourse)?.title}
            </span>
          </div>
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IReview) => (
        <Space>
          <Button
            onClick={() => handleEditFeedback(record)}
            type="primary"
            className="bg-blue-500 hover:bg-blue-600"
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <FeedbackDeleteButton feedback={record} />
        </Space>
      ),
    },
  ];

  return (
    <div className="p-2 mt-3">
      <h1 className="text-lg lg:text-2xl font-semibold mb-4">
        Feedbacks & Reviews
      </h1>
      <Table
        className="shadow-md rounded-lg"
        dataSource={feedbacks}
        columns={columns}
        rowKey="id"
        bordered
      />
      <FeedbackEditModal
        open={isEditFeedback}
        setOpen={setIsEditFeedback}
        feedback={editableFeedback as IReview}
      />
    </div>
  );
};

export default FeedbackReviews;
