import PaymentCancelled from "@/components/paymentCancel";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const PaymentCancelledPage = () => {
  return (
    <>
      <PageMetadata
        title="Payment cancelled - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <PaymentCancelled />
    </>
  );
};

PaymentCancelledPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default PaymentCancelledPage;
