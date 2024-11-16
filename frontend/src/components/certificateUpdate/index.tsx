import { useGetSingleCertificateQuery } from "@/features/certificate";
import { ICertificate } from "@/types/certificate.type";
import { useRouter } from "next/router";

const CertificateUpdate = () => {
  const { query } = useRouter();
  const certificateId = query?.certificateId as string;
  const { data } = useGetSingleCertificateQuery({ id: certificateId });
  const certificate = data?.data as ICertificate;
  return <div>CertificateUpdate: {certificate?.course?.title}</div>;
};

export default CertificateUpdate;
