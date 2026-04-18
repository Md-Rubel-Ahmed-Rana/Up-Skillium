import Address from "@/components/address";
import DashboardLayout from "@/layout/DashboardLayout";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";

const AddressPage = () => {
  return (
    <>
      <PageMetadata
        title={`Address - Up Skillium`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <Address />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(AddressPage);
