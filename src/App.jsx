import React, { useState } from 'react';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './index.css';

function App() {
  const [editingStudent, setEditingStudent] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setShowForm(true);
  };

  const handleFormComplete = () => {
    setShowForm(false);
    setEditingStudent(null);
  };

  return (
    <div className="app">
      <header>
        <h1>Student Management System</h1>
        <button onClick={() => setShowForm(true)}>Add New Student</button>
      </header>
      
      {showForm ? (
        <StudentForm 
          studentToEdit={editingStudent} 
          onComplete={handleFormComplete} 
        />
      ) : (
        <StudentList onEdit={handleEdit} />
      )}
    </div>
  );
}

export default App;