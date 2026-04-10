import { v4 as uuidv4 } from "uuid";

const benefitsData = [
  {
    id: uuidv4(),
    title: "Scholarship Opportunities",
    description:
      "We offer exclusive scholarships to deserving students who want to pursue their programming education. These scholarships aim to make learning more accessible and affordable for all.",
    bgColor: "bg-blue-500",
    ballColor: "bg-yellow-400",
    cornerColor: "bg-red-400",
  },
  {
    id: uuidv4(),
    title: "Advanced Courses",
    description:
      "Our advanced programming courses are designed for those who want to dive deep into complex topics such as Machine Learning, Artificial Intelligence, and Blockchain. Perfect for those looking to level up their skills.",
    bgColor: "bg-green-500",
    ballColor: "bg-purple-400",
    cornerColor: "bg-pink-400",
  },
  {
    id: uuidv4(),
    title: "Skill Development",
    description:
      "With access to cutting-edge tools and hands-on practice, our platform helps you enhance your coding, debugging, and problem-solving skills. Prepare for real-world challenges with the skills you develop here.",
    bgColor: "bg-purple-500",
    ballColor: "bg-cyan-400",
    cornerColor: "bg-blue-400",
  },
  {
    id: uuidv4(),
    title: "Expert Mentorship",
    description:
      "Get personalized guidance from industry experts. Our mentorship program allows you to learn from professionals, get feedback on your projects, and stay on the right track towards achieving your goals.",
    bgColor: "bg-red-400",
    ballColor: "bg-indigo-400",
    cornerColor: "bg-yellow-500",
  },
  {
    id: uuidv4(),
    title: "Project-Based Learning",
    description:
      "Learn by doing! Our curriculum is built around real-world projects where you can apply what you’ve learned to build actual applications. This hands-on experience makes you job-ready and confident.",
    bgColor: "bg-purple-500",
    ballColor: "bg-pink-400",
    cornerColor: "bg-teal-400",
  },
  {
    id: uuidv4(),
    title: "Collaborative Community",
    description:
      "Join a community of like-minded learners and professionals. Share knowledge, collaborate on projects, and solve problems together. Our community is supportive and collaborative, making learning more engaging.",
    bgColor: "bg-red-500",
    ballColor: "bg-orange-400",
    cornerColor: "bg-yellow-400",
  },
];

export default benefitsData;
