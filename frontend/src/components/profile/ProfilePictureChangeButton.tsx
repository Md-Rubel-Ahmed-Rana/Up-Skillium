import { useGetLoggedInUserQuery } from "@/features/auth";
import { useChangeProfilePictureMutation } from "@/features/user";
import { IUser } from "@/types/user.type";
import { Button } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {
  imageUrl: string;
  setImageUrl: (value: string) => void;
  file: File | null;
  setFile: (value: File | null) => void;
  setIsOpen: (value: boolean) => void;
  setIsLoading: (value: boolean) => void;
};

const ProfilePictureChangeButton = ({
  imageUrl,
  file,
  setIsOpen,
  setIsLoading,
  setFile,
  setImageUrl,
}: Props) => {
  const router = useRouter();
  const userId = router?.query?.userId as string;

  const { data } = useGetLoggedInUserQuery({});
  const user = data?.data as IUser;
  const [changeProfilePicture, { isLoading }] =
    useChangeProfilePictureMutation();
  const currentUserId =
    router.pathname === "/profile/[userId]" ? userId : user?.id || user?._id;

  const handleChangeProfilePicture = async () => {
    if (file) {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        const response: any = await changeProfilePicture({
          id: currentUserId,
          image: formData,
        });
        if (response?.data?.statusCode === 200) {
          toast.success(
            response?.data?.message || "Profile picture updated successfully"
          );
          setIsLoading(false);
          setIsOpen(false);
          setFile(null);
          setImageUrl("");
        } else {
          toast.error(
            response?.data?.message ||
              response?.error.data?.message ||
              "Profile picture was not changed. Please try again!"
          );
          setIsLoading(false);
          setIsOpen(false);
          setFile(null);
          setImageUrl("");
        }
      } catch (error: any) {
        toast.error(
          error?.message || "Profile picture was not changed. Please try again!"
        );
        setIsLoading(false);
        setIsOpen(false);
        setFile(null);
        setImageUrl("");
      } finally {
        setIsLoading(false);
        setIsOpen(false);
        setFile(null);
        setImageUrl("");
      }
    }
  };
  return (
    <Button
      disabled={!imageUrl || isLoading}
      type="primary"
      onClick={handleChangeProfilePicture}
      className="w-full"
      loading={isLoading}
      iconPosition="end"
    >
      {isLoading ? "Loading" : "Save"}
    </Button>
  );
};

export default ProfilePictureChangeButton;
