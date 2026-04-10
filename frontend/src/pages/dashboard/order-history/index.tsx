import OrderHistories from "@/components/studentOrderHistory";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";
const DashboardLayout = dynamic(import("@/layout/DashboardLayout"), {
  ssr: false,
});

const OrderHistoryPage = () => {
  return (
    <>
      <PageMetadata
        title="Order History - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <DashboardLayout>
        <OrderHistories />
      </DashboardLayout>
    </>
  );
};

export default isAuthenticate(
  AuthorizationGuard(OrderHistoryPage, ["student"])
);
