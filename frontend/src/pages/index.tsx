import PageMetadata from "@/utils/PageMetadata";
import Layout from "./HomePage/Layout";

export default function Home() {
  return (
    <>
      <PageMetadata
        title="Home - Up Skillium"
        description="this is up skillium home page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Layout />
    </>
  );
}
