import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import navbarLogo from "../../../public/assets/images/navbarLogo.webp";
import NavbarDropdown from "@/components/shared/NavbarDropdown";
import { useGetLoggedInUserQuery } from "@/features/auth";
import { IUser } from "@/types/user.type";

const NavbarPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navList = [
    {
      name: "Courses",
      path: "/courses",
    },

    {
      name: "About Us",
      path: "/about-us",
    },
  ];

  return (
    <nav className="bg-gray-50 shadow-md text-black fixed w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              UPSKILLIUM
            </Link>
          </div>
          <div className="sm:hidden">
            <button
              onClick={toggleMenu}
              className="text-black focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <div className="font-sans font-extrabold text-xl flex space-x-4">
              {navList.map((list) => (
                <Link
                  key={list.name}
                  href={list.path}
                  className="block px-3 py-2 rounded-md text-sm font-medium hover:shadow-sm border-2 border-transparent hover:border-gray-200"
                >
                  {list.name}
                </Link>
              ))}
            </div>
            {user && user?.id ? (
              <NavbarDropdown />
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
        {isOpen && (
          <div className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {user?.id && (
                <>
                  <Link
                    href={"/dashboard/profile"}
                    className="block  text-sm font-medium"
                  >
                    Profile
                  </Link>
                  <Link
                    href={"/dashboard"}
                    className="block  text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </>
              )}

              {navList.map((list) => (
                <Link
                  key={list.name}
                  href={list.path}
                  className="block  text-sm font-medium"
                >
                  {list.name}
                </Link>
              ))}
              {!user?.id && (
                <>
                  <Link href={"/login"} className="block  text-sm font-medium">
                    Login
                  </Link>
                  <Link
                    href={"/register"}
                    className="block  text-sm font-medium"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavbarPage;
