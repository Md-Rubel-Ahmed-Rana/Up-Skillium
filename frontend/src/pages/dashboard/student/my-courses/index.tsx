import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const MyCoursesPage = () => {
  return <div></div>;
};

MyCoursesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default MyCoursesPage;
