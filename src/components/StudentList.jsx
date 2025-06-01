import React, { useState, useEffect } from 'react';
import StudentCard from './StudentCard';
import { getStudents, deleteStudent } from '../services/api';

const StudentList = ({ onEdit }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('./db.json')  // public फोल्डरमुळे हे root वर accessible असतं
      .then((res) => res.json())
      .then((data) => {
        setStudents(data.students); // किंवा जे hook वापरतोस ते
      })
      .catch((err) => console.error("Error fetching db.json:", err));
  }, []);


  const fetchStudents = async () => {
    const response = await getStudents();
    setStudents(response.data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div className="student-list">
      {students.map((student) => (
        <StudentCard
          key={student.id}
          student={student}
          onDelete={handleDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default StudentList;