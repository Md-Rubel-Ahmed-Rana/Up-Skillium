import { useGetAllCertificatesQuery } from "@/features/certificate";

const ManageCertificates = () => {
  const { data } = useGetAllCertificatesQuery({});
  console.log(data);

  return <div>ManageCertificates</div>;
};

export default ManageCertificates;
