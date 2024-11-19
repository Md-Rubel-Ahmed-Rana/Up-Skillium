import LogoutButton from "@/components/shared/LogoutButton";
import buildPathToKeyMap from "@/utils/buildPathToKeyMapSidebar";
import { Menu, MenuProps } from "antd/lib";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaArchive,
  FaBook,
  FaCertificate,
  FaChalkboardTeacher,
  FaChartBar,
  FaChartLine,
  FaClipboardList,
  FaComments,
  FaDraftingCompass,
  FaFolderOpen,
  FaPenSquare,
  FaPlayCircle,
  FaPlusCircle,
  FaSignOutAlt,
  FaUserCircle,
  FaUsers,
  FaVideo,
} from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  MdOutlineContentPaste,
  MdOutlineLibraryBooks,
  MdPassword,
  MdPublishedWithChanges,
} from "react-icons/md";

const AdminSidebar = () => {
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
      icon: <GiTeacher />,
      label: "Manage Instructors",
      children: [
        {
          key: "2-1",
          icon: <FaUsers />,
          label: (
            <Link href="/dashboard/manage-instructors">All Instructors</Link>
          ),
        },
        {
          key: "2-2",
          icon: <FaChalkboardTeacher />,
          label: (
            <Link href="/dashboard/create-instructor">Create Instructor</Link>
          ),
        },
      ],
    },
    {
      key: "3",
      icon: <FaUsers />,
      label: "Manage Students",
      children: [
        {
          key: "3-1",
          icon: <FaUsers />,
          label: <Link href="/dashboard/manage-students">All Students</Link>,
        },
        {
          key: "3-2",
          icon: <FaUserCircle />,
          label: <Link href="/dashboard/create-student">Add Student</Link>,
        },
        {
          key: "3-3",
          icon: <FaChartBar />,
          label: (
            <Link href="/dashboard/students-progress">Students Progress</Link>
          ),
        },
      ],
    },
    {
      key: "4",
      icon: <FaBook />,
      label: "Manage Courses",
      children: [
        {
          key: "4-1",
          icon: <MdOutlineLibraryBooks />,
          label: <Link href="/dashboard/manage-courses">All Courses</Link>,
        },
        {
          key: "4-2",
          icon: <FaDraftingCompass />,
          label: <Link href="/dashboard/create-course">Create Course</Link>,
        },
        {
          key: "4-3",
          icon: <FaFolderOpen />,
          label: <Link href="/dashboard/draft-courses">Draft Courses</Link>,
        },
        {
          key: "4-4",
          icon: <FaArchive />,
          label: (
            <Link href="/dashboard/archived-courses">Archived Courses</Link>
          ),
        },
        {
          key: "4-5",
          icon: <MdPublishedWithChanges />,
          label: (
            <Link href="/dashboard/published-courses">Published Courses</Link>
          ),
        },
        {
          key: "4-6",
          icon: <HiOutlineDocumentText />,
          label: (
            <Link href="/dashboard/course-outlines">Courses Outlines</Link>
          ),
        },
        {
          key: "4-7",
          icon: <FaPlusCircle />,
          label: (
            <Link href="/dashboard/create-course-outline">Create Outline</Link>
          ),
        },
      ],
    },
    {
      key: "5",
      icon: <MdOutlineContentPaste />,
      label: "Manage Content",
      children: [
        {
          key: "5-1",
          icon: <FaClipboardList />,
          label: <Link href="/dashboard/manage-modules">All Modules</Link>,
        },
        {
          key: "5-2",
          icon: <FaPlusCircle />,
          label: <Link href="/dashboard/create-module">Create Module</Link>,
        },
        {
          key: "5-3",
          icon: <FaClipboardList />,
          label: <Link href="/dashboard/manage-lessons">All Lessons</Link>,
        },
        {
          key: "5-4",
          icon: <FaPlayCircle />,
          label: <Link href="/dashboard/create-lesson">Create Lesson</Link>,
        },
        {
          key: "5-5",
          icon: <FaClipboardList />,
          label: <Link href="/dashboard/manage-quizzes">All Quizzes</Link>,
        },
        {
          key: "5-6",
          icon: <FaPenSquare />,
          label: <Link href="/dashboard/create-quiz">Create Quiz</Link>,
        },
      ],
    },
    {
      key: "8",
      icon: <FaCertificate />,
      label: "Manage Certificates",
      children: [
        {
          key: "8-1",
          icon: <FaCertificate />,
          label: (
            <Link href="/dashboard/manage-certificates">All Certificates</Link>
          ),
        },
        {
          key: "8-2",
          icon: <FaCertificate />,
          label: (
            <Link href="/dashboard/create-certificate">Create Certificate</Link>
          ),
        },
      ],
    },
    {
      key: "9",
      icon: <FaChartBar />,
      label: "Reports",
      children: [
        {
          key: "9-1",
          icon: <FaChartBar />,
          label: <Link href="/dashboard/reports/courses">Course Reports</Link>,
        },
        {
          key: "9-2",
          icon: <GiTeacher />,
          label: (
            <Link href="/dashboard/reports/instructors">
              Instructor Reports
            </Link>
          ),
        },
        {
          key: "9-3",
          icon: <FaUsers />,
          label: (
            <Link href="/dashboard/reports/students">Student Reports</Link>
          ),
        },
        {
          key: "9-4",
          icon: <FaComments />,
          label: (
            <Link href="/dashboard/reports/feedback">Feedback Reports</Link>
          ),
        },
      ],
    },
    {
      key: "10",
      icon: <FaComments />,
      label: "Assignments",
      children: [
        {
          key: "10-1",
          icon: <FaClipboardList />,
          label: (
            <Link href="/dashboard/manage-assignments">All Assignments</Link>
          ),
        },
        {
          key: "10-2",
          icon: <FaPenSquare />,
          label: (
            <Link href="/dashboard/create-assignment">Create Assignment</Link>
          ),
        },
      ],
    },
    {
      key: "11",
      icon: <FaComments />,
      label: "Feedback & Reviews",
      children: [
        {
          key: "11-1",
          icon: <FaComments />,
          label: <Link href="/dashboard/feedback-reviews">All Reviews</Link>,
        },
        {
          key: "11-2",
          icon: <FaComments />,
          label: (
            <Link href="/dashboard/feedback-reviews/instructor">
              Instructor Reviews
            </Link>
          ),
        },
        {
          key: "11-3",
          icon: <FaComments />,
          label: (
            <Link href="/dashboard/feedback-reviews/course">
              Course Reviews
            </Link>
          ),
        },
      ],
    },
    {
      key: "12",
      icon: <FaVideo />,
      label: "Manage Meetings",
      children: [
        {
          key: "12-1",
          icon: <FaVideo />,
          label: (
            <Link href="/dashboard/meetings/scheduled">Scheduled Meetings</Link>
          ),
        },
        {
          key: "12-2",
          icon: <FaVideo />,
          label: (
            <Link href="/dashboard/meetings/completed">Completed Meetings</Link>
          ),
        },
        {
          key: "12-3",
          icon: <FaVideo />,
          label: <Link href="/dashboard/meetings/create">Create Meeting</Link>,
        },
      ],
    },
    {
      key: "13",
      icon: <FaChartLine />,
      label: "Analytics",
      children: [
        {
          key: "13-1",
          icon: <FaChartLine />,
          label: (
            <Link href="/dashboard/analytics/courses">Course Analytics</Link>
          ),
        },
        {
          key: "13-2",
          icon: <FaChartBar />,
          label: (
            <Link href="/dashboard/analytics/students">Student Analytics</Link>
          ),
        },
        {
          key: "13-3",
          icon: <GiTeacher />,
          label: (
            <Link href="/dashboard/analytics/instructors">
              Instructor Analytics
            </Link>
          ),
        },
        {
          key: "13-4",
          icon: <FaChartLine />,
          label: (
            <Link href="/dashboard/analytics/platform">
              Platform Usage Analytics
            </Link>
          ),
        },
      ],
    },
    {
      key: "14",
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

export default AdminSidebar;
