import OrderHistories from "@/components/studentOrderHistory";
import AuthorizationGuard from "@/middlewares/AuthorizationGuard";
import isAuthenticate from "@/middlewares/ProtectPrivateRoutes";
import PageMetadata from "@/utils/PageMetadata";
import dynamic from "next/dynamic";
const TestDashboardLayout = dynamic(import("@/layout/TestDashboardLayout"), {
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
      <TestDashboardLayout>
        <OrderHistories />
      </TestDashboardLayout>
    </>
  );
};

export default isAuthenticate(AuthorizationGuard(OrderHistoryPage, "student"));
