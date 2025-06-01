import React, { useState, useEffect, useRef } from 'react';
import { createStudent, updateStudent } from '../services/api';

const StudentForm = ({ studentToEdit, onComplete }) => {
  const [formData, setFormData] = useState({
    student_image: null,
    student_name: '',
    student_email: '',
    student_mobile: '',
    student_address: ''
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (studentToEdit) {
      setFormData(studentToEdit);
      if (studentToEdit.student_image) {
        setImagePreview(studentToEdit.student_image);
      }
    }
  }, [studentToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, student_image: file }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (formData.id) {
        await updateStudent(formData.id, formData);
      } else {
        await createStudent(formData);
      }
      onComplete();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="student-form">
      <h2>{formData.id ? 'Edit' : 'Add'} Student</h2>
      <form onSubmit={handleSubmit}>
        <div className="image-upload-container">
          <div className="image-preview" onClick={triggerFileInput}>
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" />
            ) : (
              <div className="upload-placeholder">
                <span>+</span>
                <p>Upload Photo</p>
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
          <button 
            type="button" 
            onClick={triggerFileInput}
            className="upload-button"
          >
            Choose Image
          </button>
        </div>
        
        <label>
          Full Name:
          <input 
            type="text" 
            name="student_name" 
            value={formData.student_name} 
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Email:
          <input 
            type="email" 
            name="student_email" 
            value={formData.student_email} 
            onChange={handleChange}
            required
          />
        </label>
        
        <label>
          Mobile:
          <input 
            type="text" 
            name="student_mobile" 
            value={formData.student_mobile} 
            onChange={handleChange}
            required minLength={'10'}
            maxLength={'10'}
          />
        </label>
        
        <label>
          Address:
          <textarea 
            name="student_address" 
            value={formData.student_address} 
            onChange={handleChange}
            required
          />
        </label>
        
        <div className="form-actions">
          <button type="submit">Save</button>
          <button type="button" onClick={onComplete}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;