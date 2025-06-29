import NavbarDropdown from "@/components/shared/NavbarDropdown";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";
import navbarLogo from "../../../public/assets/images/navbarLogo.webp";
import CourseCart from "../cart";
import UserLoading from "./UserLoading";

const Navbar = () => {
  const { data, isLoading } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-lg  bg-gray-50 bg-opacity-80 text-black shadow-md
      `}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src={navbarLogo}
                alt="navbarLogo"
                height={isMobile ? 25 : 30}
                width={isMobile ? 40 : 50}
                className="rounded-full mr-4"
              />
            </Link>
            <Link
              href="/"
              className="text-md lg:text-2xl font-serif hover:text-blue-500 font-bold"
            >
              UP SKILLIUM
            </Link>
          </div>
          <div className="sm:hidden">
            {isLoading ? (
              <UserLoading />
            ) : (
              <div className="flex items-center gap-4">
                {user && user?.id && user?.role?.name === "student" && (
                  <CourseCart />
                )}
                <NavbarDropdown isToggleIcon={true} />
              </div>
            )}
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="font-sans font-extrabold text-xl flex space-x-4">
              <Link
                href={"/"}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm hover:text-blue-600"
              >
                Home
              </Link>
              <Link
                href={"/courses"}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm hover:text-blue-600"
              >
                Courses
              </Link>
              <Link
                href={"/team"}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm hover:text-blue-600"
              >
                Our Team
              </Link>
              <Link
                href={"/success-stories"}
                className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm hover:text-blue-600"
              >
                Success Stories
              </Link>

              {user && user?.id && user?.role?.name === "student" && (
                <>
                  <Link
                    href={"/dashboard/my-courses"}
                    className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm hover:text-blue-600"
                  >
                    My Classes
                  </Link>
                  <CourseCart />
                </>
              )}
            </div>

            {isLoading ? (
              <UserLoading />
            ) : (
              <>
                {user && user?.id ? (
                  <NavbarDropdown isToggleIcon={false} />
                ) : (
                  <>
                    <CourseCart />
                    <Link
                      href={"/login"}
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm hover:text-blue-600"
                    >
                      Login
                    </Link>
                    <Link
                      href={"/register"}
                      className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm hover:text-blue-600"
                    >
                      Register
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
