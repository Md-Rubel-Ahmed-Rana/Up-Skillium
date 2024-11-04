import Link from "next/link";
import Image from "next/image";
import navbarLogo from "../../../public/assets/images/navbarLogo.webp";
import NavbarDropdown from "@/components/shared/NavbarDropdown";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";

const Navbar = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const dashboardRoute =
    user?.role?.role === "student"
      ? "/dashboard/student"
      : user?.role?.role === "instructor"
      ? "/dashboard/instructor"
      : "/dashboard/admin";

  return (
    <nav className="bg-gray-50 shadow-md text-black">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Image
              src={navbarLogo}
              alt="navbarLogo"
              height={30}
              width={50}
              className="rounded-full mr-4"
            />
            <Link
              href="/"
              className="text-2xl font-serif hover:text-yellow-700 font-bold text-lime-950"
            >
              UP-SKILLIUM
            </Link>
          </div>
          <div className="sm:hidden">
            <NavbarDropdown
              dashboardRoute={dashboardRoute}
              isToggleIcon={true}
            />
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="font-sans font-extrabold text-xl flex space-x-4">
              <Link
                href={"/"}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm border-2 border-transparent hover:border-gray-200"
              >
                Home
              </Link>
              <Link
                href={"/courses"}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm border-2 border-transparent hover:border-gray-200"
              >
                Courses
              </Link>
              {user?.role?.role === "student" && (
                <Link
                  href={"/dashboard/student/my-courses"}
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm border-2 border-transparent hover:border-gray-200"
                >
                  My Courses
                </Link>
              )}
            </div>
            {user && user?.id ? (
              <NavbarDropdown
                dashboardRoute={dashboardRoute}
                isToggleIcon={false}
              />
            ) : (
              <>
                <Link
                  href={"/login"}
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm border-2 border-transparent hover:border-gray-200"
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm border-2 border-transparent hover:border-gray-200"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
