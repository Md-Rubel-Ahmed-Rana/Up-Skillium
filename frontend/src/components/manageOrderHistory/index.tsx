import { useGetAllOrderHistoryQuery } from "@/features/enrollment";
import CertificateSkeleton from "@/skeletons/certificateSkeleton";
import { IEnrollment } from "@/types/enrollment.type";
import PaymentTable from "../payments";

const ManageOrderHistories = () => {
  const { data, isLoading } = useGetAllOrderHistoryQuery({});
  const enrollments = data?.data as IEnrollment[];

  return (
    <div className="p-2 lg:p-4">
      <h2 className="font-semibold mb-2 text-lg lg:text-xl">Order histories</h2>
      {isLoading ? (
        <CertificateSkeleton />
      ) : (
        <PaymentTable enrollments={enrollments} />
      )}
    </div>
  );
};

export default ManageOrderHistories;
