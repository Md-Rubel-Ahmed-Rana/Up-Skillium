import { TableProps } from "antd/lib";

interface DataType {
  id: string;
  key: string;
  serial: number;
  name: string;
}

const getMergedColumns = (
  columns: any[],
  isEditing: (record: DataType) => boolean
): TableProps<DataType>["columns"] =>
  columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType) => ({
        record,
        inputType: col.dataIndex === "serial" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

export default getMergedColumns;
