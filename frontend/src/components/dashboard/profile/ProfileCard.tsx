import { IUser } from "@/types/user.type";
import { Avatar, Button } from "antd/lib";
import { FaCamera } from "react-icons/fa";
import UpdateProfilePicture from "./UpdateProfilePicture";
import { useState } from "react";

type Props = {
  user: IUser;
};

const ProfileCard = ({ user }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="relative">
        <Avatar size={80} src={user?.image} alt="User Avatar" />
        <FaCamera
          onClick={handleOpenModal}
          className="absolute bottom-2 right-1/2 translate-x-1/2 translate-y-1/2 text-white bg-blue-600 p-1 text-2xl rounded-full cursor-pointer"
        />
      </div>
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold">{user?.name}</h2>
        <p>
          <Button type="default" className="text-gray-500 font-semibold">
            {user?.role?.role.toUpperCase()}
          </Button>
        </p>
      </div>
      <UpdateProfilePicture isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default ProfileCard;