import { Button, Input, Modal, Upload } from "antd/lib";
import { UploadChangeParam } from "antd/lib/upload";
import { useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface DataType {
  id: string;
  key: string;
  serial: number;
  name: string;
}

type Props = {
  open: boolean;
  setUploadedModules: (values: DataType[]) => void;
  setOpen: (value: boolean) => void;
};

const JSONUploaderModal = ({ open, setOpen, setUploadedModules }: Props) => {
  const [jsonType, setJsonType] = useState<"file" | "paste">("file");
  const [jsonInput, setJsonInput] = useState<string>("");
  const [modules, setModules] = useState<DataType[]>([]);

  const handleCancel = () => {
    setOpen(false);
    resetState();
  };

  const resetState = () => {
    setJsonInput("");
    setModules([]);
    setJsonType("file");
  };

  const handleJsonInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  };

  const handleFileUpload = (info: UploadChangeParam) => {
    if (!info.file) {
      toast.error("No file uploaded. Please try again.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsedData = JSON.parse(reader.result as string);
        setJsonInput(JSON.stringify(parsedData, null, 2));
        processJsonData(parsedData);
        setJsonType("paste");
      } catch (error) {
        toast.error("Failed to parse JSON from file. Please check the format.");
      }
    };
    reader.readAsText(info.file as unknown as Blob);
  };

  const processJsonData = (data: any) => {
    if (Array.isArray(data)) {
      const processedModules = data.map((module: any, index: number) => ({
        ...module,
        id: uuidv4(),
        key: uuidv4(),
        serial: module.serial || index + 1,
      }));
      setModules(processedModules);
    } else {
      toast.error("Invalid JSON format. Expected an array of modules.");
    }
  };

  const handleCreateModules = () => {
    if (!modules?.length) {
      toast.error("No modules found. Please upload or paste valid JSON data.");
      return;
    }
    setOpen(false);
    resetState();
    setUploadedModules(modules);
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-3">
          <h2>JSON Uploader</h2>
          <Button
            type={jsonType === "file" ? "primary" : "default"}
            onClick={() => setJsonType("file")}
          >
            JSON File
          </Button>
          <Button
            type={jsonType === "paste" ? "primary" : "default"}
            onClick={() => setJsonType("paste")}
          >
            JSON Paste
          </Button>
        </div>
      }
      open={open}
      onOk={handleCreateModules}
      onCancel={handleCancel}
      okText="Upload JSON"
    >
      {jsonType === "paste" ? (
        <Input.TextArea
          rows={6}
          placeholder="Paste JSON data here"
          value={jsonInput}
          onChange={handleJsonInputChange}
        />
      ) : (
        <Upload
          beforeUpload={() => false}
          onChange={handleFileUpload}
          accept=".json"
        >
          <Button>Upload JSON File</Button>
        </Upload>
      )}
    </Modal>
  );
};

export default JSONUploaderModal;
