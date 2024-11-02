import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa";

const FooterPage = () => {
  return (
    <footer className="bg-gray-100 text-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h2 className="text-2xl font-bold font-serif">UPSKILLIUM</h2>
            <p className="mt-2 text-yellow-950">
              UpSkillium is your trusted platform for enhancing your skills.
              Join us to unlock the best learning resources.
            </p>
          </div>
          <div className="flex justify-center items-center">
            <div>
              <h3 className="text-lg font-semibold mb-3">Links!</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:underline">
                    Courses
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">
              Follow Up Skillium Team
            </h3>
            <ul className="flex space-x-4 text-center justify-center">
              <FaFacebook />
              <FaGithub />
              <FaLinkedinIn />
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-800">
          <p>
            &copy; {new Date().getFullYear()} UpSkillium. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;
