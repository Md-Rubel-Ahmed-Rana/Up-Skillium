import OrderHistories from "@/components/dashboard/studentOrderHistory";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const OrderHistoryPage = () => {
  return (
    <>
      <PageMetadata
        title="Order History - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <OrderHistories />
    </>
  );
};

OrderHistoryPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default OrderHistoryPage;
