import { useGetLoggedInUserQuery } from "@/features/auth";
import { IGetLiveClass } from "@/types/liveClass.type";
import { IUser } from "@/types/user.type";
import { Button, Table, Tooltip } from "antd/lib";
import DeleteLiveClass from "./DeleteLiveClass";
import LiveClassEdit from "./LiveClassEdit";
import LiveClassStudentModal from "./LiveClassStudentModal";

type Props = {
  classes: IGetLiveClass[];
  isLoading: boolean;
};

const LiveClassTable = ({ classes, isLoading }: Props) => {
  const { data: userData } = useGetLoggedInUserQuery({});
  const user = userData?.data as IUser;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (title: string) => <span className="font-semibold">{title}</span>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (description: string) => (
        <Tooltip title={description} placement="topLeft">
          <Button type="default" size="small">
            Show
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Schedule",
      render: (_: Date, liveClass: IGetLiveClass) => (
        <div className="space-y-1 text-xs">
          <p>{new Date(liveClass?.startDateTime).toLocaleString()}</p>
          <p>{new Date(liveClass?.endDateTime).toLocaleString()}</p>
        </div>
      ),
    },
    {
      title: "Topics",
      dataIndex: "topics",
      key: "topics",
      render: (topics: string[]) => (
        <Tooltip title={topics.join(", ")} placement="topLeft">
          <Button type="default" size="small">
            {`Show ${topics?.length}`}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <Tooltip title={tags.join(", ")} placement="topLeft">
          <Button type="default" size="small">
            {`Show ${tags?.length}`}
          </Button>
        </Tooltip>
      ),
    },
    {
      title: "Meeting",
      dataIndex: "meetingLink",
      key: "meetingLink",
      render: (meetingLink: string) => (
        <a href={meetingLink} target="_blank" rel="noreferrer">
          <Button type="primary" size="small">
            Join now
          </Button>
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Button
          size="small"
          type="primary"
          className={`${
            status === "upcoming"
              ? "bg-yellow-500"
              : status === "completed"
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        >
          {status}
        </Button>
      ),
    },
    {
      title: "Actions",
      render: (_: any, liveClass: IGetLiveClass) => (
        <>
          {user?.role?.name === "student" ? (
            <p>Null</p>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <LiveClassEdit liveClass={liveClass} />
              <DeleteLiveClass liveClass={liveClass} />
              <LiveClassStudentModal
                students={liveClass?.students}
                title={liveClass?.title}
              />
            </div>
          )}
        </>
      ),
    },
  ];

  return (
    <Table
      dataSource={classes}
      columns={columns}
      rowKey={(record) => record?.id}
      loading={isLoading}
      locale={{ emptyText: "No upcoming live classes" }}
      bordered
    />
  );
};

export default LiveClassTable;
