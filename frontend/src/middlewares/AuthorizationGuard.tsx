import { adminSidebarItems } from "@/components/dashboard/AdminSidebar";
import { instructorSidebarItems } from "@/components/dashboard/InstructorSidebar";
import { studentSidebarItems } from "@/components/dashboard/StudentSidebar";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import extractHrefLinksFromDashboardSidebar from "@/utils/extractHrefLinksFromDashboardSidebar";
import PageMetadata from "@/utils/PageMetadata";
import { useRouter } from "next/router";

const AuthorizationGuard = (
  WrappedComponent: any,
  role: "admin" | "instructor" | "student",
  route?: string
) => {
  const ComponentWithAuth = (props: any) => {
    const { data, isLoading, error }: any = useGetLoggedInUserQuery({});
    const router = useRouter();
    const user: IUser = data?.data;

    let allowedRoutes: string[] = [];
    if (role === "admin") {
      allowedRoutes = extractHrefLinksFromDashboardSidebar(adminSidebarItems);
    } else if (role === "instructor") {
      allowedRoutes = extractHrefLinksFromDashboardSidebar(
        instructorSidebarItems
      );
    } else if (role === "student") {
      allowedRoutes = extractHrefLinksFromDashboardSidebar(studentSidebarItems);
    }

    if (route && !allowedRoutes.includes(route)) {
      allowedRoutes.push(route);
    }

    const currentPath = router.pathname;

    const userRole = user?.role?.name;

    if (isLoading) {
      return (
        <>
          <PageMetadata
            title=" Authorizing access... - Up Skillium"
            description="This is up skillium courses page"
            keywords="courses, up-skillium, up skillium, web development"
          />
          <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 text-center px-4">
            <h1 className="text-lg lg:text-3xl font-bold mb-2">
              Authorizing access...
            </h1>
            <p className="text-sm text-gray-600">
              We appreciate your patience while we verify your access. This will
              only take a moment.
            </p>
          </div>
        </>
      );
    }

    if (error || !user) {
      return (
        <>
          <PageMetadata
            title="Unauthorized Access - Up Skillium"
            description="This is up skillium courses page"
            keywords="courses, up-skillium, up skillium, web development"
          />
          <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 text-center px-4">
            <h1 className="text-lg lg:text-3xl font-bold mb-2">
              You are not authorized to access this page!
            </h1>
            <p className="text-sm text-gray-600">
              Please don&apos;t try again. Too many attempts may block or ban
              your account.
            </p>
          </div>
        </>
      );
    }

    if (userRole !== role || (route && !allowedRoutes.includes(currentPath))) {
      return (
        <>
          <PageMetadata
            title="Unauthorized Access - Up Skillium"
            description="This is up skillium courses page"
            keywords="courses, up-skillium, up skillium, web development"
          />
          <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 text-center px-4">
            <h1 className="text-lg lg:text-3xl font-bold mb-2 text-red-600">
              Unauthorized Access
            </h1>
            <p className="text-sm text-gray-600">
              This page is not available for your role or the route is
              restricted.
            </p>
          </div>
        </>
      );
    }

    return <WrappedComponent {...props} />;
  };

  if (WrappedComponent.getLayout) {
    ComponentWithAuth.getLayout = WrappedComponent.getLayout;
  }

  return ComponentWithAuth;
};

export default AuthorizationGuard;
