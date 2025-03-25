import { IGetLesson } from "@/types/lesson.type";
import {
  Button,
  Input,
  InputRef,
  Space,
  Table,
  TableColumnType,
  TableProps,
} from "antd/lib";
import { FilterDropdownProps } from "antd/lib/table/interface";
import { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { IoIosSearch } from "react-icons/io";
import DeleteLesson from "./DeleteLesson";
import EditLesson from "./EditLesson";

type Props = {
  lessons: IGetLesson[];
  isLoading: boolean;
};

type DataIndex = keyof IGetLesson;

const LessonTable = ({ lessons, isLoading }: Props) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): TableColumnType<IGetLesson> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<IoIosSearch />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <IoIosSearch style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (open: boolean) => {
      if (open) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: TableProps<IGetLesson>["columns"] = [
    {
      title: "Lesson Name",
      key: "title",
      dataIndex: "title",
      ...getColumnSearchProps("title"),
    },
    {
      title: "Serial",
      key: "serial",
      dataIndex: "serial",
    },
    {
      title: "Type",
      key: "type",
      dataIndex: "type",
    },
    {
      title: "Module",
      key: "module.title",
      dataIndex: ["module", "title"],
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Updated At",
      key: "updatedAt",
      dataIndex: "updatedAt",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, lesson: IGetLesson) => (
        <div className="flex flex-col gap-2">
          <EditLesson
            lesson={lesson}
            isButton={true}
            buttonSize="small"
            buttonStyles="w-full"
          />
          <DeleteLesson
            lessonId={lesson?.id}
            lessonTitle={lesson?.title}
            shouldAddIcon={false}
            buttonSize="small"
          />
        </div>
      ),
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={lessons}
      loading={isLoading}
      bordered
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      locale={{ emptyText: "No lessons found" }}
    />
  );
};

export default LessonTable;
