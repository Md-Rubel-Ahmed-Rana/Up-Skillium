import NavbarDropdown from "@/components/shared/NavbarDropdown";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import navbarLogo from "../../../public/assets/images/navbarLogo.webp";

const Navbar = () => {
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const router = useRouter();
  const isHomePage = router.pathname === "/";

 
  const navbarStyle = isHomePage
    ? "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white" 
    : "bg-gray-50 text-black shadow-md"; 

  const textColor = isHomePage ? "text-white" : "text-black"; 

  return (
    <nav className={`transition-all duration-1000 ease-in-out ${navbarStyle} ${textColor}`}>
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
              className={`text-2xl font-serif hover:text-yellow-500 font-bold ${textColor}`}
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
                className={`block px-3 py-2 rounded-md text-sm font-medium hover:shadow-lg ${textColor}`}
              >
                Home
              </Link>
              <Link
                href={"/courses"}
                className={`block px-3 py-2 rounded-md text-sm font-medium hover:shadow-lg ${textColor}`}
              >
                Courses
              </Link>
              {user && user?.id && user?.role?.name !== "admin" && (
                <Link
                  href={"/dashboard/my-courses"}
                  className={`block px-3 py-2 rounded-md text-sm font-medium hover:shadow-lg ${textColor}`}
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
                  className={`block px-3 py-2 rounded-md text-sm font-medium hover:shadow-lg ${textColor}`}
                >
                  Login
                </Link>
                <Link
                  href={"/register"}
                  className={`block px-3 py-2 rounded-md text-sm font-medium hover:shadow-lg ${textColor}`}
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
