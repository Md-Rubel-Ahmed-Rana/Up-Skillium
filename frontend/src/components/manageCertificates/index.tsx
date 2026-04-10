import { useGetAllCertificatesQuery } from "@/features/certificate";
import { ICertificate } from "@/types/certificate.type";
import CertificateTable from "../certificates";

const ManageCertificates = () => {
  const { data, isLoading } = useGetAllCertificatesQuery({});
  const certificates = data?.data as ICertificate[];

  return (
    <div className="mt-3 px-2 pb-20">
      <h1 className="text-lg lg:text-2xl font-semibold mb-3">
        Manage Certificates
      </h1>
      <div className="overflow-x-auto">
        <CertificateTable certificates={certificates} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ManageCertificates;
