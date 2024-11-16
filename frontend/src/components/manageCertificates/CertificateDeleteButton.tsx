import { useDeleteCertificateMutation } from "@/features/certificate";
import { Button } from "antd/lib";
import toast from "react-hot-toast";

type Props = {
  certificateId: string;
};

const CertificateDeleteButton = ({ certificateId }: Props) => {
  const [deleteCertificate, { isLoading }] = useDeleteCertificateMutation();

  const handleDeleteCertificate = async () => {
    try {
      const result: any = await deleteCertificate({ id: certificateId });
      if (result?.data?.statusCode === 200) {
        toast.success(
          result?.data?.message || "Certificate deleted successfully!"
        );
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to delete certificate."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to delete certificate. Error: ${error?.message}`);
    }
  };

  return (
    <Button
      disabled={isLoading}
      loading={isLoading}
      iconPosition="end"
      type="primary"
      danger
      onClick={handleDeleteCertificate}
    >
      {isLoading ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default CertificateDeleteButton;
