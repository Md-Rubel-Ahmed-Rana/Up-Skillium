import { IGetLiveClass } from "@/types/liveClass.type";
import { Table, Tag } from "antd/lib";

type Props = {
  classes: IGetLiveClass[];
  isLoading: boolean;
};

const LiveClassTable = ({ classes, isLoading }: Props) => {
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
        <span className="text-gray-600">{description}</span>
      ),
    },
    {
      title: "Start Time",
      dataIndex: "startDateTime",
      key: "startDateTime",
      render: (startDateTime: Date) => new Date(startDateTime).toLocaleString(),
    },
    {
      title: "Duration (mins)",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Meeting Link",
      dataIndex: "meetingLink",
      key: "meetingLink",
      render: (meetingLink: string) => (
        <a href={meetingLink} target="_blank" rel="noreferrer">
          Join Meeting
        </a>
      ),
    },
    {
      title: "Topics",
      dataIndex: "topics",
      key: "topics",
      render: (topics: string[]) => (
        <div>
          {topics.map((topic) => (
            <Tag key={topic} color="green" className="mr-1">
              {topic}
            </Tag>
          ))}
        </div>
      ),
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) => (
        <div>
          {tags.map((tag) => (
            <Tag key={tag} color="blue" className="mr-1">
              {tag}
            </Tag>
          ))}
        </div>
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
    />
  );
};

export default LiveClassTable;
