import { useState } from "react";
import CertificateForm from "./CertificateForm";
import CourseList from "./CourseList";
import StudentList from "./StudentList";

const CreateCertificate = () => {
  const [selectedStudent, setSelectedStudent] = useState({
    id: "",
    name: "",
  });

  const [selectedCourse, setSelectedCourse] = useState({
    id: "",
    name: "",
    technologies: [""],
  });

  return (
    <div className="flex justify-center items-center pt-5 pb-20">
      <div className="flex w-full gap-10 p-5 border rounded-md">
        <CertificateForm
          selectedCourse={selectedCourse}
          selectedStudent={selectedStudent}
        />
        <div className="border w-full flex gap-2 p-5 rounded-md">
          <div className="w-full">
            <StudentList setSelectedStudent={setSelectedStudent} />
            <div className="mt-2">
              <h2 className="text-gray-700">Selected Student:</h2>
              <h3 className="font-semibold">{selectedStudent?.name}</h3>
            </div>
          </div>
          <div className="w-full">
            <CourseList setSelectedCourse={setSelectedCourse} />
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
