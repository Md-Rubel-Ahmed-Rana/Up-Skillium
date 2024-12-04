import CreateUser from "../createUser";

const CreateStudent = () => {
  return (
    <div className="w-full lg:w-1/2 mx-auto h-screen flex justify-center items-center">
      <CreateUser
        formTitle="Create student account"
        role="student"
        successRoute="/dashboard/manage-students"
        buttonText="Create account"
      />
    </div>
  );
};

export default CreateStudent;
