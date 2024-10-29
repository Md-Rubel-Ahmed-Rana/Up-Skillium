import Register from "@/components/register";
import PageMetadata from "@/utils/PageMetadata";

const RegisterPage = () => {
  return (
    <>
      <PageMetadata
        title="Register - Up Skillium"
        description="this is up skillium register signup page"
        keywords="up skillium, online course, web development, digital marketing"
      />
      <Register />
    </>
  );
};

export default RegisterPage;
