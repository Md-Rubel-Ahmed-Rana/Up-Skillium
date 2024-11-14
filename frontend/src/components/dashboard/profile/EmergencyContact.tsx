import { useUpdateEmergencyContactMutation } from "@/features/user";
import { IUser } from "@/types/user.type";
import { Button, Descriptions, Input } from "antd/lib";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";

type Props = {
  user: IUser;
};

const EmergencyContact = ({ user }: Props) => {
  const isLargeDevice = useMediaQuery({ minWidth: 1024 });
  const [updateContact, { isLoading }] = useUpdateEmergencyContactMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [newValues, setNewValues] = useState({
    name: user?.emergencyContact?.name || "",
    relationship: user?.emergencyContact?.relationship || "",
    phone: user?.emergencyContact?.phone || "",
  });

  const handleInputChange = (field: string, value: any) => {
    setNewValues((prevValues) => ({ ...prevValues, [field]: value }));
  };

  const handleUpdateInfo = async () => {
    try {
      const response: any = await updateContact({
        ...newValues,
        id: user?.id,
      });
      if (response?.data?.statusCode === 200) {
        toast.success(
          response?.data?.message || "Contact updated successfully"
        );
      } else {
        toast.error(
          response?.error?.message ||
            response?.error?.data?.message ||
            "Failed to update contact"
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "There was a server-side error occurred");
    }
    setIsEdit(false);
  };
  return (
    <Descriptions
      title={
        <div className="flex items-center gap-2">
          <span className={!isLargeDevice && isEdit ? "hidden" : "block"}>
            Emergency Contact
          </span>
          {isEdit ? (
            <>
              <Button
                disabled={isLoading}
                onClick={handleUpdateInfo}
                loading={isLoading}
                iconPosition="end"
                type="primary"
              >
                {isLoading ? "Loading" : "Save changes"}
              </Button>
              <Button disabled={isLoading} onClick={() => setIsEdit(false)}>
                Cancel
              </Button>
            </>
          ) : (
            <FaEdit
              onClick={() => setIsEdit(true)}
              className="cursor-pointer"
            />
          )}
        </div>
      }
      column={{ xs: 1, sm: 1, md: 2 }}
      bordered
      className="mt-4 pb-4 border-b"
    >
      <Descriptions.Item label="Name">
        {isEdit ? (
          <Input
            type="text"
            value={newValues.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        ) : (
          <p> {user?.emergencyContact?.name || "Empty"}</p>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Relationship">
        {isEdit ? (
          <Input
            type="text"
            value={newValues.relationship}
            onChange={(e) => handleInputChange("relationship", e.target.value)}
          />
        ) : (
          <p> {user?.emergencyContact?.relationship || "Empty"}</p>
        )}
      </Descriptions.Item>
      <Descriptions.Item label="Phone">
        {isEdit ? (
          <Input
            type="text"
            value={newValues.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
          />
        ) : (
          <p> {user?.emergencyContact?.phone || "Empty"}</p>
        )}
      </Descriptions.Item>
    </Descriptions>
  );
};

export default EmergencyContact;
