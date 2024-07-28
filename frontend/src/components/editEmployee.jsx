import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './index.css';  // Import the CSS file

const EditEmployee = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/employees/${id}`);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching employee data');
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setEmployee({ ...employee, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('mobile', employee.mobile);
    formData.append('designation', employee.designation);
    formData.append('gender', employee.gender);
    formData.append('courses', employee.courses);
    if (employee.image) {
      formData.append('image', employee.image);
    }

    try {
      await axios.put(`http://localhost:3000/api/employees/${id}`, formData);
      navigate('/employee-list');
    } catch (error) {
      setError('Error updating employee');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container1">
      <h1>Edit Employee</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={employee.name} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={employee.email} onChange={handleChange} />
        </label>
        <label>
          Mobile:
          <input type="text" name="mobile" value={employee.mobile} onChange={handleChange} />
        </label>
        <label>
          Designation:
          <input type="text" name="designation" value={employee.designation} onChange={handleChange} />
        </label>
        <label>
          Gender:
          <input type="text" name="gender" value={employee.gender} onChange={handleChange} />
        </label>
        <label>
          Courses:
          <input type="text" name="courses" value={employee.courses ? employee.courses.join(', ') : ''} onChange={handleChange} />
        </label>
        <label>
          Image:
          <input type="file" name="image" onChange={handleImageChange} />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditEmployee;
