import NavbarDropdown from "@/components/shared/NavbarDropdown";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";
import navbarLogo from "../../../public/assets/images/navbarLogo.webp";

const Navbar = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  return (
    <nav className="bg-gray-50 shadow-md text-black animate__animated animate__fadeInDown">
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
            <NavbarDropdown isToggleIcon={true} />
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
              {user && user?.id && user?.role?.name !== "admin" && (
                <Link
                  href={"/dashboard/my-courses"}
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm border-2 border-transparent hover:border-gray-200"
                >
                  My Courses
                </Link>
              )}
            </div>
            {user && user?.id ? (
              <NavbarDropdown isToggleIcon={false} />
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
