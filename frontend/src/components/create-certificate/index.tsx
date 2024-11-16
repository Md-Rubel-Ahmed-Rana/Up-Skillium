import CourseList from "./CourseList";
import StudentList from "./StudentList";

const CreateCertificate = () => {
  const formData = {
    certificatePdfData: {
      studentName: "",
      courseName: "",
      technologies: [
        "HTML",
        "CSS",
        "Bootstrap",
        "Tailwindcss",
        "Javascript",
        "Reactjs",
        "Nextjs",
      ],
      score: 80,
    },
    schema: {
      user: "67278c03f343385e39a8b4e3",
      course: "671a210c16006aa95c25c87b",
    },
  };

  return (
    <div className="flex justify-center items-center pt-5 pb-20">
      <div>
        <CourseList />
        <StudentList />
      </div>
    </div>
  );
};

export default CreateCertificate;
