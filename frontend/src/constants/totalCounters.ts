import { v4 as uuidv4 } from "uuid";

const totalCountersData = [
  {
    id: uuidv4(),
    title: "Courses",
    totalCount: 50,
    description: "Explore our diverse range of expert-led courses.",
    animate: "animate__fadeInLeft",
  },
  {
    id: uuidv4(),
    title: "Enrolled",
    totalCount: 1500,
    description: "Join a growing community of learners worldwide.",
    animate: "animate__fadeInLeft",
  },
  {
    id: uuidv4(),
    title: "Success Students",
    totalCount: 700,
    description: "Achieve your goals with our successful alumni.",
    animate: "animate__fadeInRight",
  },
  {
    id: uuidv4(),
    title: "Team Members",
    totalCount: 80,
    description: "A passionate team dedicated to your success.",
    animate: "animate__fadeInRight",
  },
];

export default totalCountersData;
