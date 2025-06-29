import ContactUs from "@/components/home/contact";
import RootLayout from "@/layout/RootLayout";
import PageMetadata from "@/utils/PageMetadata";
import { ReactElement } from "react";

const ContactUsPage = () => {
  return (
    <>
      <PageMetadata
        title="Contact - Up Skillium"
        description="This is up skillium courses page"
        keywords="courses, up-skillium, up skillium, web development"
      />
      <ContactUs />
    </>
  );
};

ContactUsPage.getLayout = function (page: ReactElement) {
  return <RootLayout maxWidth="100000px">{page}</RootLayout>;
};

export default ContactUsPage;
