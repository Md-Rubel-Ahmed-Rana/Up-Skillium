import FeedbackEditModal from "@/components/feedbackReviews/FeedbackEditModal";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetAllReviewsByReviewToQuery } from "@/features/review";
import { CourseFeedbackSkeleton } from "@/skeletons/courseDetailsSkeleton";
import { IReview } from "@/types/review.type";
import { IUser } from "@/types/user.type";
import { Button, Rate } from "antd/lib";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import ReviewPagination from "./ReviewPagination";

type Props = {
  courseId: string;
};
const ReviewsList = ({ courseId }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const [isEditReview, setIsEditReview] = useState(false);
  const [pagination, setPagination] = useState<{ page: number; limit: number }>(
    { page: 1, limit: 5 }
  );
  const { data, isLoading } = useGetAllReviewsByReviewToQuery({
    reviewToId: courseId,
    limit: pagination?.limit,
    page: pagination?.page,
  });

  const reviews = (data?.data?.reviews as IReview[]) || [];
  const totalReviews = (data?.data?.totalReviews as number) || 0;

  return (
    <>
      <div className="mt-3">
        {isLoading ? (
          <CourseFeedbackSkeleton />
        ) : (
          <>
            <div className="flex flex-col gap-2">
              {reviews?.length > 0 ? (
                <>
                  {reviews?.map((review) => (
                    <div
                      className="flex flex-col gap-2 bg-gray-50 p-2 rounded-md border"
                      key={review?.id}
                    >
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={review?.reviewer?.image}
                            alt={review?.reviewer?.name}
                            className="lg:w-12 w-8 lg:h-12 h-8 rounded-full object-cover"
                          />
                          <div>
                            <h2 className="font-semibold text-xs lg:text-lg">
                              {review?.reviewer?.name}
                            </h2>
                            <Rate count={5} disabled value={review?.rating} />
                          </div>
                        </div>
                        {review?.reviewer?.id === user?.id && (
                          <>
                            <Button
                              className="text-blue-600  hidden lg:block"
                              icon={<FaPencilAlt className="mr-1 -mb-[2px]" />}
                              onClick={() => setIsEditReview(true)}
                            >
                              Edit
                            </Button>
                            <FaPencilAlt
                              className="text-blue-500 cursor-pointe block lg:hidden"
                              onClick={() => setIsEditReview(true)}
                            />
                          </>
                        )}
                        <FeedbackEditModal
                          feedback={review}
                          open={isEditReview}
                          setOpen={setIsEditReview}
                        />
                      </div>
                      <p className="text-gray-500">{review?.feedback}</p>
                    </div>
                  ))}
                </>
              ) : (
                <div>
                  <h4 className="text-md text-yellow-600 font-serif">
                    No one reviewed yet. Be first reviewer!
                  </h4>
                </div>
              )}
            </div>
            {reviews?.length > 0 && (
              <ReviewPagination
                totalReviews={totalReviews}
                setPagination={setPagination}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ReviewsList;
