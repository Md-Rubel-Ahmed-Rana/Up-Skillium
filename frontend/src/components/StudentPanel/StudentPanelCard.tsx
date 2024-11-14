import { Card } from "antd/lib";
import gsap from "gsap";
import React from "react";
import { Student } from "./students";
const { Meta } = Card;

type StudentCardProps = {
  student: Student;
};

const StudentPanelCard: React.FC<StudentCardProps> = ({ student }) => {
  React.useEffect(() => {
    gsap.fromTo(
      ".student-card",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="student-card">
      <Card
        hoverable
        cover={
          <img
            alt={student.name}
            src={student.image}
            className="w-32 h-48 object-cover rounded-md"
          />
        }
        className="shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <Meta
          title={student.name}
          description={
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-700">
                Roll:
                <span className="text-gray-500">{student.roll}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Course:
                <span className="text-gray-500">{student.courseCategory}</span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Registration Date:
                <span className="text-gray-500">
                  {student.registrationDate}
                </span>
              </p>
              <p className="text-sm font-semibold text-gray-700">
                Credits:
                <span className="text-gray-500">{student.credits}</span>
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
};

export default StudentPanelCard;
