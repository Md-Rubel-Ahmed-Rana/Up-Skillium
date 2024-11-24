import ManageOrderHistories from "@/components/manageOrderHistory";
import DashboardLayout from "@/layout/DashboardLayout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ManageOrderHistoriesPage = () => {
  return (
    <>
      <PageMetadata
        title="Order Histories - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <ManageOrderHistories />
    </>
  );
};

ManageOrderHistoriesPage.getLayout = function (page: ReactElement) {
  return (
    <RootLayout>
      <DashboardLayout>{page}</DashboardLayout>
    </RootLayout>
  );
};

export default ManageOrderHistoriesPage;
