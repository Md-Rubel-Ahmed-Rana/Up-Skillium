import { IUser } from "@/types/user.type";
import { useState } from "react";
import CertificateForm from "./CertificateForm";
import CourseList from "./CourseList";
import StudentList from "./StudentList";

const CreateCertificate = () => {
  const [students, setStudents] = useState<IUser[]>([]);

  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
  });

  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    name: "",
    technologies: [""],
  });

  console.log(selectedCourse);

  return (
    <div className="flex justify-center items-center pt-5 pb-20">
      <div className="flex flex-col-reverse lg:flex-row w-full gap-5 p-2 rounded-md">
        <CertificateForm
          selectedCourse={selectedCourse}
          selectedStudent={selectedStudent}
        />
        <div className="border w-full flex flex-col lg:flex-row gap-2 lg:p-5 p-2 rounded-md">
          <div className="w-full">
            <StudentList
              setSelectedStudent={setSelectedStudent}
              students={students}
            />
            <div className="mt-2">
              <h2 className="text-gray-700">Selected Student:</h2>
              <h3 className="font-semibold">{selectedStudent?.name}</h3>
            </div>
          </div>
          <div className="w-full">
            <CourseList
              setSelectedCourse={setSelectedCourse}
              setStudents={setStudents}
            />
            <div className="mt-2">
              <h2 className="text-gray-700">Selected Course:</h2>
              <h3 className="font-semibold">{selectedCourse?.name}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCertificate;
