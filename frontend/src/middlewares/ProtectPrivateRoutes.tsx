import FullScreenLoader from "@/components/shared/FullScreenLoader";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import { useRouter } from "next/router";
import { useEffect } from "react";

const isAuthenticate = (WrappedComponent: any) => {
  const ComponentWithAuth = (props: any) => {
    const router = useRouter();
    const { data, isLoading, error }: any = useGetLoggedInUserQuery({});
    const user: IUser = data?.data;

    useEffect(() => {
      if (!isLoading && !user) {
        router.push("/login");
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return <FullScreenLoader />;
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-screen w-screen bg-gray-100">
          <h1 className="text-lg lg:text-3xl font-bold">
            Your are not authenticated!
          </h1>
        </div>
      );
    }

    return user ? <WrappedComponent {...props} /> : null;
  };

  // Copy getLayout so it is not lost
  if (WrappedComponent.getLayout) {
    ComponentWithAuth.getLayout = WrappedComponent.getLayout;
  }

  return ComponentWithAuth;
};

export default isAuthenticate;
