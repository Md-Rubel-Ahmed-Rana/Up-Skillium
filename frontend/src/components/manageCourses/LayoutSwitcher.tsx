import { Radio, RadioChangeEvent } from "antd/lib";
import { FaThLarge, FaTable } from "react-icons/fa";

type Props = {
  viewMode: string;
  setViewMode: (mode: string) => void;
};

const LayoutSwitcher = ({ viewMode, setViewMode }: Props) => {
  const handleViewModeChange = (e: RadioChangeEvent) => {
    setViewMode(e.target.value);
  };

  return (
    <div className="flex items-center gap-3 mb-4 px-2">
      <h6 className="text-lg font-semibold mb-2">View as: </h6>
      <Radio.Group
        defaultValue={viewMode}
        buttonStyle="solid"
        className="flex items-center gap-2"
        onChange={handleViewModeChange}
      >
        <Radio.Button value="grid">
          <div className="flex items-center gap-2 px-4">
            <FaThLarge />
            <span>Grid</span>
          </div>
        </Radio.Button>
        <Radio.Button value="table" type="rounded">
          <div className="flex items-center gap-2 px-4">
            <FaTable />
            <span>Table</span>
          </div>
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default LayoutSwitcher;
