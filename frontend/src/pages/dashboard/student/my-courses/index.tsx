import RootLayout from "@/layout/RootLayout";
import { ReactElement } from "react";

const MyCoursesPage = () => {
  return <div>This is student my course page</div>;
};

MyCoursesPage.getLayout = function (page: ReactElement) {
  return <RootLayout>{page}</RootLayout>;
};

export default MyCoursesPage;
