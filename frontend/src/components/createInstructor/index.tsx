import CreateUser from "../createUser";

const CreateInstructor = () => {
  return (
    <div className="w-full lg:w-1/2 mx-auto h-screen flex justify-center items-center">
      <CreateUser
        formTitle="Create Instructor Account"
        role="instructor"
        successRoute="/dashboard/manage-instructors"
        buttonText="Create account"
      />
    </div>
  );
};

export default CreateInstructor;
