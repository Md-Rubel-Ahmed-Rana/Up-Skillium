import { useGetLoggedInUserQuery } from "@/features/auth";
import { useGetStudentCertificatesQuery } from "@/features/certificate";
import { IGetCertificate } from "@/types/certificate.type";
import { IUser } from "@/types/user.type";
import { Button, Typography } from "antd/lib";

const { Title, Text } = Typography;

const StudentCertificates = () => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;
  const { data } = useGetStudentCertificatesQuery({ userId: user?.id });
  const certificates = data?.data as IGetCertificate[];

  return (
    <div className="p-2 lg:p-4">
      <Title level={3} className="text-gray-600">
        Student Certificates
      </Title>
      {certificates?.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {certificates?.map((certificate) => (
            <li key={certificate?.id} className="p-4 border rounded">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">
                  {certificate?.course?.title || "Web Development Masterclass"}
                </h3>
                <Button
                  type="primary"
                  size="large"
                  onClick={() =>
                    window.open(certificate?.certificateUrl, "_blank")
                  }
                >
                  Download
                </Button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <Text className="font-semibold text-lg text-gray-600">
          No certificates available.
        </Text>
      )}
    </div>
  );
};

export default StudentCertificates;
