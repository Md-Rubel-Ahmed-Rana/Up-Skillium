import { useEffect } from "react";
import { useRouter } from "next/router";

const NotFoundPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.back();
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleHomeRedirect = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6">Page Not Found</p>
      <button
        onClick={handleHomeRedirect}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Back to Home
      </button>
      <p className="mt-4 text-gray-500">
        You will be redirected back in 5 seconds...
      </p>
    </div>
  );
};

export default NotFoundPage;
