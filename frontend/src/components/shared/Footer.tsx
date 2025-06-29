import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TfiWorld } from "react-icons/tfi";
import navbarLogo from "../../../public/assets/images/navbarLogo.webp";
import FooterBubbles from "./FooterBubbles";

const FooterPage = () => {
  return (
    <footer className="relative bg-gradient-to-b from-blue-900 via-indigo-800 to-gray-900 text-white pb-20 pt-40 overflow-hidden">
      <FooterBubbles />

      <div className="container mx-auto text-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left items-end text-sm px-5">
          <div className="flex flex-col gap-2 items-center">
            <Link href="/">
              <Image
                src={navbarLogo}
                alt="navbarLogo"
                height={60}
                width={80}
                className="rounded-full mr-4"
              />
            </Link>
            <Link
              href="/"
              className="text-md lg:text-2xl font-serif hover:text-yellow-500 font-bold"
            >
              UP SKILLIUM
            </Link>
          </div>
          <div className="">
            <h2 className="text-xl text-center font-semibold mb-4">About Us</h2>
            <p className="mb-2 text-center">
              We are dedicated to providing the best programming resources and
              community support for developers worldwide.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-center font-semibold mb-4">
              Quick Links
            </h2>
            <ul className="flex flex-col gap-2 items-center justify-center">
              <li className="mb-2">
                <Link href="/" className="hover:text-yellow-400">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/courses" className="hover:text-yellow-400">
                  Courses
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/team" className="hover:text-yellow-400">
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl text-center font-semibold mb-4">
              Follow Us
            </h2>
            <div className="flex justify-center gap-4">
              <Link
                href="https://mdrubelahmedrana.vercel.app"
                className="text-pink-400 hover:text-pink-600"
              >
                <TfiWorld size={30} className="text-white" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/md-rubel-ahmed-rana"
                className="text-blue-700 hover:text-blue-900"
              >
                <FaLinkedin size={30} className="text-white" />
              </Link>
              <Link
                href="https://github.com/Md-Rubel-Ahmed-Rana"
                className="text-black"
              >
                <FaGithub size={30} className="text-white" />
              </Link>
            </div>
          </div>
        </div>
        <p className="mt-16 text-xs text-gray-400">
          &copy; All Rights Reserved by Up Skillium.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;
