import { Button } from "antd/lib";
import UpdateProfilePicture from "./UpdateProfilePicture";
import { useState } from "react";

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="py-20">
      <p>This is profile page</p>
      <Button onClick={() => setIsModalOpen(true)} type="primary">
        Change Profile Picture
      </Button>
      <UpdateProfilePicture isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default Profile;
