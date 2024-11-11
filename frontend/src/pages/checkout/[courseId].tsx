import Checkout from "@/components/checkout";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";
import { ReactElement } from "react";

const CheckoutPage = () => {
  const { query } = useRouter();
  const courseName = query?.courseName as string;
  return (
    <>
      <PageMetadata
        title={`Checkout - ${courseName || "Up Skillium"}`}
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Checkout />
    </>
  );
};

export default CheckoutPage;

CheckoutPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};
