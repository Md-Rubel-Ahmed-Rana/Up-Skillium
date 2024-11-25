import { IReview } from "@/types/review.type";
import { Rate } from "antd/lib";

type Props = {
  reviews: IReview[];
  isLoading: boolean;
};

const ReviewsList = ({ reviews, isLoading }: Props) => {
  return (
    <div className="mt-3">
      {isLoading ? (
        <div>Feedbacks loading...</div>
      ) : (
        <div>
          {reviews?.length > 0 ? (
            <>
              {reviews?.map((review) => (
                <div
                  className="flex flex-col gap-2 bg-gray-50 p-2 rounded-md border"
                  key={review?.id}
                >
                  <div className="flex items-center gap-2">
                    <img
                      src={review?.reviewer?.image}
                      alt={review?.reviewer?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="font-semibold">
                        {review?.reviewer?.name}
                      </h2>
                      <Rate count={5} disabled value={review?.rating} />
                    </div>
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
      )}
    </div>
  );
};

export default ReviewsList;
