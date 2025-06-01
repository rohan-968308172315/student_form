import React from 'react';

const StudentCard = ({ student, onDelete, onEdit }) => {
  return (
    <div className="student-card">
      <div className="student-image">
        {student.student_image ? (
          <img src={student.student_image} alt={student.student_name} />
        ) : (
          <div className="no-image">No Photo</div>
        )}
      </div>
      <div className="student-info">
        <h3>{student.student_name}</h3>
        <p>Email: {student.student_email}</p>
        <p>Mobile: {student.student_mobile}</p>
        <p>Address: {student.student_address}</p>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(student)}>Edit</button>
        <button onClick={() => onDelete(student.id)}>Delete</button>
      </div>
    </div>
  );
};

export default StudentCard;