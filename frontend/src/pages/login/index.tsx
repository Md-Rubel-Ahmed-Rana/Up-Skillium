import Login from "@/components/login";
import PageMetadata from "@/utils/PageMetadata";

const LoginPage = () => {
  return (
    <>
      <PageMetadata
        title="Login - Up Skillium"
        description="this is up skillium login page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Login />
    </>
  );
};

export default LoginPage;
