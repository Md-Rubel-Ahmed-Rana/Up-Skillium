import { gsap } from "gsap";
import { useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const FooterPage = () => {
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
    <footer className="relative bg-gradient-to-b from-blue-900 via-indigo-800 to-gray-900 text-white pb-20 pt-40 overflow-hidden">
      <div className="absolute top-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="w-full h-32"
        >
          <path
            fill="#2c5282"
            d="M0,128L48,133.3C96,139,192,149,288,144C384,139,480,117,576,122.7C672,128,768,160,864,160C960,160,1056,128,1152,122.7C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-0 opacity-80">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          className="w-64 h-auto"
        >
          <path
            fill="#60A5FA"
            d="M536 192c-11.7 0-23.3.9-34.8 2.5C481.8 80.1 397.6 0 304 0H288c-88.4 0-160 71.6-160 160v144c0 57.4-14.1 111.6-39 159.2-8.8 17-3 37.7 13.6 48 14.8 8.9 34.3 7.1 47.1-4.7C186.6 471.5 216.5 448 240 448h416c48.6 0 96-39.4 96-88 0-70.7-119.5-168-216-168zM80 96c17.7 0 32-14.3 32-32S97.7 32 80 32 48 46.3 48 64s14.3 32 32 32zm64 64c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z"
          />
        </svg>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="ripple absolute w-16 h-16 bg-blue-400 opacity-30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: "scale(0)",
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto text-center relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left text-sm px-5">
          <div>
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            <p className="mb-2">
              We are dedicated to providing the best programming resources and
              community support for developers worldwide.
            </p>
            <a href="#" className="text-yellow-400 hover:underline">
              Read more
            </a>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-400">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-400">
                  Tutorials
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-400">
                  Community
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:text-yellow-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
            <div className="flex gap-4">
              <a href="#" className="text-blue-500 hover:text-blue-700">
                <FaFacebook size={30} />
              </a>
              <a href="#" className="text-blue-300 hover:text-blue-500">
                <FaTwitter size={30} />
              </a>
              <a href="#" className="text-pink-400 hover:text-pink-600">
                <FaInstagram size={30} />
              </a>
              <a href="#" className="text-blue-700 hover:text-blue-900">
                <FaLinkedin size={30} />
              </a>
              <a href="#" className="text-red-600 hover:text-red-800">
                <FaYoutube size={30} />
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Subscribe</h2>
            <p className="mb-4">
              Get updates about the latest tutorials and offers.
            </p>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-l-md border-0 focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-yellow-500 text-black rounded-r-md hover:bg-yellow-600"
              >
                Subscribe
              </button>
            </form>
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
