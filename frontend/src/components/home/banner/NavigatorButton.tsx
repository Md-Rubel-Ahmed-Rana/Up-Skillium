import Link from "next/link";

const NavigatorButton = () => {
  return (
    <div className="text-center">
      <h2 className="text-white text-lg lg:text-3xl font-bold mb-2">
        Ready to Start Your Journey?
      </h2>
      <Link
        href="/courses"
        className="inline-block bg-gradient-to-r from-purple-600 border via-pink-500 to-red-500 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl hover:from-purple-700 hover:via-pink-600 hover:to-red-600 transition-all duration-300"
      >
        Get Started Now
      </Link>
    </div>
  );
};

export default NavigatorButton;
