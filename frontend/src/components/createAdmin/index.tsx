import CreateUser from "../createUser";

const CreateAdmin = () => {
  return (
    <div className="w-full lg:w-1/2 mx-auto h-screen flex justify-center items-center">
      <CreateUser
        formTitle="Create Admin Account"
        role="admin"
        successRoute="/dashboard/manage-users"
        buttonText="Create account"
      />
    </div>
  );
};

export default CreateAdmin;
