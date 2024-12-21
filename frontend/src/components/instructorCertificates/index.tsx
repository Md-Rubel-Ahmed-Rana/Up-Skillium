import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetCertificatesByInstructorQuery } from "@/features/certificate";
import { ICertificate } from "@/types/certificate.type";
import { IUser } from "@/types/user.type";
import CertificateTable from "../certificates";

const InstructorCertificates = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data, isLoading } = useGetCertificatesByInstructorQuery({
    instructorId: user?.id,
  });
  const certificates = data?.data as ICertificate[];

  return (
    <div className="mt-3 px-2 pb-20">
      <h1 className="text-lg lg:text-2xl font-semibold mb-3">
        My students certificates
      </h1>
      <div className="overflow-x-auto">
        <CertificateTable certificates={certificates} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default InstructorCertificates;
