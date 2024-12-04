import { v4 as uuidv4 } from "uuid";

const successStudentsData = [
  {
    id: uuidv4(),
    studentName: "John Doe",
    studentImage: "https://randomuser.me/api/portraits/men/1.jpg",
    courseName: "Web Development",
    score: 95,
  },
  {
    id: uuidv4(),
    studentName: "Jane Smith",
    studentImage: "https://randomuser.me/api/portraits/women/2.jpg",
    courseName: "Graphic Design",
    score: 66,
  },
  {
    id: uuidv4(),
    studentName: "Alice Johnson",
    studentImage: "https://randomuser.me/api/portraits/women/3.jpg",
    courseName: "Digital Marketing",
    score: 40,
  },
  {
    id: uuidv4(),
    studentName: "Michael Brown",
    studentImage: "https://randomuser.me/api/portraits/men/4.jpg",
    courseName: "Data Science",
    score: 65,
  },
  {
    id: uuidv4(),
    studentName: "Emily Davis",
    studentImage: "https://randomuser.me/api/portraits/women/5.jpg",
    courseName: "UI/UX Design",
    score: 71,
  },
  {
    id: uuidv4(),
    studentName: "Chris Wilson",
    studentImage: "https://randomuser.me/api/portraits/men/6.jpg",
    courseName: "Cybersecurity",
    score: 88,
  },
  {
    id: uuidv4(),
    studentName: "Sophia Miller",
    studentImage: "https://randomuser.me/api/portraits/women/7.jpg",
    courseName: "Project Management",
    score: 54,
  },
  {
    id: uuidv4(),
    studentName: "James Moore",
    studentImage: "https://randomuser.me/api/portraits/men/8.jpg",
    courseName: "Machine Learning",
    score: 57,
  },
  {
    id: uuidv4(),
    studentName: "Olivia Taylor",
    studentImage: "https://randomuser.me/api/portraits/women/9.jpg",
    courseName: "Business Analytics",
    score: 51,
  },
  {
    id: uuidv4(),
    studentName: "Daniel Anderson",
    studentImage: "https://randomuser.me/api/portraits/men/10.jpg",
    courseName: "Cloud Computing",
    score: 77,
  },
  {
    id: uuidv4(),
    studentName: "Mia White",
    studentImage: "https://randomuser.me/api/portraits/women/11.jpg",
    courseName: "Photography",
    score: 60,
  },
  {
    id: uuidv4(),
    studentName: "Benjamin Harris",
    studentImage: "https://randomuser.me/api/portraits/men/12.jpg",
    courseName: "Video Editing",
    score: 90,
  },
  {
    id: uuidv4(),
    studentName: "Charlotte Clark",
    studentImage: "https://randomuser.me/api/portraits/women/13.jpg",
    courseName: "App Development",
    score: 61,
  },
  {
    id: uuidv4(),
    studentName: "Liam Rodriguez",
    studentImage: "https://randomuser.me/api/portraits/men/14.jpg",
    courseName: "Game Design",
    score: 53,
  },
  {
    id: uuidv4(),
    studentName: "Amelia Lewis",
    studentImage: "https://randomuser.me/api/portraits/women/15.jpg",
    courseName: "Artificial Intelligence",
    score: 78,
  },
  {
    id: uuidv4(),
    studentName: "Ethan Walker",
    studentImage: "https://randomuser.me/api/portraits/men/16.jpg",
    courseName: "Robotics",
    score: 99,
  },
  {
    id: uuidv4(),
    studentName: "Harper Hall",
    studentImage: "https://randomuser.me/api/portraits/women/17.jpg",
    courseName: "Digital Illustration",
    score: 40,
  },
  {
    id: uuidv4(),
    studentName: "Lucas Allen",
    studentImage: "https://randomuser.me/api/portraits/men/18.jpg",
    courseName: "SEO Optimization",
    score: 33,
  },
  {
    id: uuidv4(),
    studentName: "Ella Young",
    studentImage: "https://randomuser.me/api/portraits/women/19.jpg",
    courseName: "Content Writing",
    score: 28,
  },
  {
    id: uuidv4(),
    studentName: "Alexander King",
    studentImage: "https://randomuser.me/api/portraits/men/20.jpg",
    courseName: "Blockchain Technology",
    score: 25,
  },
];

const score1Students = successStudentsData.filter(
  (student) => student.score >= 80
);
const score2Students = successStudentsData.filter(
  (student) => student.score >= 60 && student.score < 80
);
const score3Students = successStudentsData.filter(
  (student) => student.score >= 40 && student.score < 60
);
const score4Students = successStudentsData.filter(
  (student) => student.score >= 20 && student.score < 40
);

const successStudents = [
  { id: uuidv4(), name: "Score 1", students: score1Students },
  { id: uuidv4(), name: "Score 2", students: score2Students },
  { id: uuidv4(), name: "Score 3", students: score3Students },
  { id: uuidv4(), name: "Score 4", students: score4Students },
];

export default successStudents;
