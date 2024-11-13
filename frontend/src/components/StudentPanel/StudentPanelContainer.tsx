import React from 'react';
import StudentPanelCard from './StudentPanelCard';
import studentData from './students';

const StudentPanelContainer: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {studentData.map((student) => (
        <StudentPanelCard key={student.id} student={student} />
      ))}
    </div>
  );
};

export default StudentPanelContainer;
