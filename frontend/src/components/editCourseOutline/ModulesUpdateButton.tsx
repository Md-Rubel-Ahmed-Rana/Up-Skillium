import { useUpdateOutlineModulesMutation } from "@/features/courseOutline";
import { IUpdateModuleOutline } from "@/types/courseOutline.type";
import { Button } from "antd/lib";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {
  modules: any[];
};

const ModulesUpdateButton = ({ modules }: Props) => {
  const { query } = useRouter();
  const outlineId = query?.outlineId as string;
  const [updateModules, { isLoading }] = useUpdateOutlineModulesMutation();

  const handleSaveModules = async () => {
    const oldModules: any = [];
    const newModules: any = [];
    modules.forEach((module: any) => {
      if (module?.status === "old") {
        oldModules.push({
          id: module?.id,
          name: module?.name,
          serial: module?.serial,
        });
      } else {
        newModules.push({
          name: module?.name,
          serial: module?.serial,
        });
      }
    });
    await handleUpdateModules(oldModules.concat(newModules));
  };

  const handleUpdateModules = async (data: IUpdateModuleOutline[]) => {
    try {
      const result: any = await updateModules({ id: outlineId, modules: data });
      if (result?.data?.statusCode === 200) {
        toast.success(result?.data?.message || "Modules updated successfully!");
      } else {
        toast.error(
          result?.error?.message ||
            result?.error?.data?.message ||
            result?.data?.error?.message ||
            "Failed to update modules."
        );
      }
    } catch (error: any) {
      toast.error(`Failed to update modules. Error: ${error?.message}`);
    }
  };

  return (
    <Button
      disabled={isLoading}
      loading={isLoading}
      iconPosition="end"
      type="primary"
      onClick={handleSaveModules}
    >
      {isLoading ? "Saving..." : "Save Changes"}
    </Button>
  );
};

export default ModulesUpdateButton;
