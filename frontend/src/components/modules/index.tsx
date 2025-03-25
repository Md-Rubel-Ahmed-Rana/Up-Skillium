import { useGetAllCoursesQuery } from "@/features/course";
import { ICourse } from "@/types/course.type";
import { IGetModule } from "@/types/module.type";
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
import DeleteModuleModal from "../manageModules/DeleteModuleModal";
import EditModuleModal from "../manageModules/EditModuleModal";
import ViewLessonButton from "./ViewLessonButton";

type Props = {
  modules: IGetModule[];
  isLoading: boolean;
};

type DataIndex = keyof IGetModule;

const ModulesTable = ({ modules, isLoading }: Props) => {
  const { data } = useGetAllCoursesQuery({});
  const courses = (data?.data as ICourse[]) || [];
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
  ): TableColumnType<IGetModule> => ({
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

  const columns: TableProps<IGetModule>["columns"] = [
    {
      title: "Module Name",
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
      title: "Course",
      key: "course.image",
      dataIndex: ["course", "image", "title"],
      filters: courses?.map((course) => ({
        text: course?.title,
        value: course?.id,
      })),
      onFilter: (value, module) => module?.course?.id === value,
      render: (_: string, module: IGetModule) => (
        <div className="flex items-center gap-2">
          <img
            src={module?.course?.image}
            alt="Course Thumbnail"
            className="h-12 w-12 rounded-full ring-1"
          />
          <h3>{module?.course?.title}</h3>
        </div>
      ),
    },
    {
      title: "Lessons",
      key: "lessons",
      dataIndex: "lessons",
      render: (lessons: string[], module: IGetModule) => (
        <ViewLessonButton
          lessons={lessons?.length || 0}
          moduleId={module?.id}
          moduleName={module?.title}
        />
      ),
    },
    {
      title: "Created At",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (date: Date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, module: IGetModule) => (
        <div className="flex flex-col items-center gap-1">
          <EditModuleModal
            module={module}
            isButton={true}
            buttonStyles="w-full"
            buttonSize="small"
          />
          <DeleteModuleModal
            moduleId={module?.id}
            moduleTitle={module?.title}
            isButton={true}
            buttonStyles="w-full"
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
      dataSource={modules}
      loading={isLoading}
      bordered
      pagination={{ pageSize: 10 }}
      className="shadow-md rounded-lg w-full min-w-[900px]"
      locale={{ emptyText: "No modules found" }}
    />
  );
};

export default ModulesTable;
