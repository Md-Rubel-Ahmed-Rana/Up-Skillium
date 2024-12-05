import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const FooterPage = () => {
  const router = useRouter();
  const isHomePage = router.pathname === "/";

  useEffect(() => {
    const ripples = document.querySelectorAll(".ripple");
    ripples.forEach((ripple) => {
      gsap.to(ripple, {
        scale: 8,
        opacity: 0,
        duration: 4,
        repeat: -1,
        delay: Math.random() * 2,
        ease: "power1.out",
      });
    });
  }, []);

  return (
    <footer
      className={`relative py-20 overflow-hidden ${
        isHomePage
          ? "bg-gradient-to-r from-blue-600 border-b border-gray-400 via-purple-600 to-pink-600 bg-opacity-80 text-white"
          : "bg-gray-100 text-black"
      }`}
    >
      <div className="container mx-auto text-center relative z-10 border-0 border-t-2">
        <h1 className="text-5xl mb-4 font-semibold mt-8">Up Skillium LMS</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left text-sm px-5">
          <div>
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="mb-2">
              We are dedicated to providing the best programming resources and community support for developers worldwide.
            </p>
            <Link href="#" className="text-yellow-400 hover:underline">
              Read more
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul>
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
                <Link href="/contact" className="hover:text-yellow-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <Link href="https://www.youtube.com/" className="text-blue-300 hover:text-blue-500">
                <FaTwitter size={30} />
              </Link>
              <Link href="https://www.instagram.com/" className="text-pink-400 hover:text-pink-600">
                <FaInstagram size={30} />
              </Link>
              <Link href="https://bd.linkedin.com/" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={30} />
              </Link>
              <Link href="https://github.com/Md-Rubel-Ahmed-Rana" className="text-black">
                <FaGithub size={30} />
              </Link>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
            <p className="mb-4">Get updates about the latest tutorials and offers.</p>
          </div>
        </div>
        <p className="mt-16 text-xs text-gray-400">
          © 2024 All Rights Reserved by Upskillium LMS.
        </p>
      </div>
    </footer>
  );
};

export default FooterPage;


