import LogoutButton from "@/components/shared/LogoutButton";
import buildPathToKeyMap from "@/utils/buildPathToKeyMapSidebar";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaAward,
  FaBook,
  FaBookOpen,
  FaCheckCircle,
  FaClipboardList,
  FaCommentDots,
  FaFileAlt,
  FaFolderOpen,
  FaHourglassHalf,
  FaPenFancy,
  FaPenSquare,
  FaPlusCircle,
  FaPlusSquare,
  FaSignOutAlt,
  FaTasks,
  FaUserCircle,
  FaUsers,
} from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  MdAddToQueue,
  MdDoneAll,
  MdHistory,
  MdOutlineLibraryBooks,
  MdOutlineMeetingRoom,
  MdPassword,
  MdSchedule,
  MdVideoCameraFront,
} from "react-icons/md";

const InstructorSidebar = () => {
  const router = useRouter();
  const adminItems: MenuProps["items"] = [
    {
      key: "1",
      icon: <FaUserCircle />,
      label: "Profile",
      children: [
        {
          key: "1-1",
          icon: <FaUserCircle />,
          label: <Link href="/dashboard/profile-info">Profile Info</Link>,
        },
        {
          key: "1-2",
          icon: <MdPassword />,
          label: <Link href="/dashboard/change-password">Change Password</Link>,
        },
      ],
    },
    {
      key: "2",
      icon: <FaBook />,
      label: <Link href="/dashboard/my-classes">My Classes</Link>,
    },
    {
      key: "3",
      icon: <MdOutlineLibraryBooks />,
      label: "Manage Content",
      children: [
        {
          key: "3-1",
          icon: <FaFolderOpen />,
          label: <Link href="/dashboard/modules">All Modules</Link>,
        },
        {
          key: "3-2",
          icon: <FaPlusSquare />,
          label: <Link href="/dashboard/create-module">Create Module</Link>,
        },
        {
          key: "3-3",
          icon: <FaBookOpen />,
          label: <Link href="/dashboard/lessons">All Lessons</Link>,
        },
        {
          key: "3-4",
          icon: <FaPlusCircle />,
          label: <Link href="/dashboard/create-lesson">Create Lesson</Link>,
        },
        {
          key: "3-5",
          icon: <FaTasks />,
          label: <Link href="/dashboard/quizzes">All Quizzes</Link>,
        },
        {
          key: "3-6",
          icon: <FaPenFancy />,
          label: <Link href="/dashboard/create-quiz">Create Quiz</Link>,
        },
        {
          key: "3-7",
          icon: <HiOutlineDocumentText />,
          label: (
            <Link href="/dashboard/course/course-outlines">
              Courses Outlines
            </Link>
          ),
        },
        {
          key: "3-8",
          icon: <FaPlusCircle />,
          label: (
            <Link href="/dashboard/create-course-outline">Create Outline</Link>
          ),
        },
      ],
    },
    {
      key: "4",
      icon: <FaTasks />,
      label: "Assignments",
      children: [
        {
          key: "4-1",
          icon: <FaClipboardList />,
          label: <Link href="/dashboard/assignments">All Assignments</Link>,
        },
        {
          key: "4-2",
          icon: <FaHourglassHalf />,
          label: (
            <Link href="/dashboard/assignments/pending">
              Pending Assignments
            </Link>
          ),
        },
        {
          key: "4-3",
          icon: <FaCheckCircle />,
          label: (
            <Link href="/dashboard/assignments/reviewed">
              Reviewed Assignments
            </Link>
          ),
        },
        {
          key: "4-4",
          icon: <FaPenSquare />,
          label: (
            <Link href="/dashboard/create-assignment">Create Assignment</Link>
          ),
        },
      ],
    },
    {
      key: "5",
      icon: <MdVideoCameraFront />,
      label: "Live Classes",
      children: [
        {
          key: "5-1",
          icon: <MdHistory />,
          label: <Link href="/dashboard/previous-live-classes">Previous</Link>,
        },
        {
          key: "5-2",
          icon: <MdSchedule />,
          label: <Link href="/dashboard/upcoming-live-classes">Upcoming</Link>,
        },
        {
          key: "5-3",
          icon: <MdAddToQueue />,
          label: (
            <Link href="/dashboard/create-live-class">Create Live Class</Link>
          ),
        },
      ],
    },
    {
      key: "6",
      icon: <FaAward />,
      label: "Certificates",
      children: [
        {
          key: "6-1",
          icon: <FaFileAlt />,
          label: <Link href="/dashboard/certificates">Certificates</Link>,
        },
        {
          key: "6-2",
          icon: <FaPlusSquare />,
          label: (
            <Link href="/dashboard/create-certificate">Create Certificate</Link>
          ),
        },
      ],
    },
    {
      key: "7",
      icon: <FaCommentDots />,
      label: <Link href="/dashboard/reviews">Reviews</Link>,
    },
    {
      key: "8",
      icon: <FaUsers />,
      label: <Link href="/dashboard/my-students">My Students</Link>,
    },
    {
      key: "9",
      icon: <MdOutlineMeetingRoom />,
      label: "Manage Meetings",
      children: [
        {
          key: "9-1",
          icon: <MdSchedule />,
          label: (
            <Link href="/dashboard/meetings/upcoming">Upcoming Meetings</Link>
          ),
        },
        {
          key: "9-2",
          icon: <MdDoneAll />,
          label: (
            <Link href="/dashboard/meetings/completed">Completed Meetings</Link>
          ),
        },
      ],
    },
    {
      key: "10",
      icon: <FaSignOutAlt />,
      label: <LogoutButton />,
    },
  ];

  const pathToKeyMap = buildPathToKeyMap(adminItems);
  const selectedKey = pathToKeyMap[router.pathname] || "1";

  return (
    <Menu
      theme="light"
      mode="inline"
      className="w-full lg:min-h-screen h-full mt-3 flex lg:flex-col flex-row overflow-x-auto lg:overflow-visible space-x-3 lg:space-x-0"
      defaultSelectedKeys={[selectedKey]}
      items={adminItems}
    />
  );
};

export default InstructorSidebar;
