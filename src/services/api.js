import axios from 'axios';

const API_URL = 'https://683c53e128a0b0f2fdc6d1d5.mockapi.io/StudentAPI/students';

export const getStudents = async () => {
  return await axios.get(API_URL);
};

export const createStudent = async (student) => {
  // Convert image to base64 for JSON storage
  if (student.student_image) {
    const base64Image = await convertToBase64(student.student_image);
    student.student_image = base64Image;
  }
  return await axios.post(API_URL, student);
};

export const updateStudent = async (id, updatedStudent) => {
  if (updatedStudent.student_image instanceof File) {
    const base64Image = await convertToBase64(updatedStudent.student_image);
    updatedStudent.student_image = base64Image;
  }
  return await axios.put(`${API_URL}/${id}`, updatedStudent);
};

export const deleteStudent = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};

// Helper function to convert file to base64
const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};