import React, { useState } from 'react';
import axios from 'axios';

const AddEmployee = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mobile.length !== 10 || isNaN(mobile)) {
      setError('Mobile number must be 10 digits.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('mobile', mobile);
      formData.append('designation', designation);
      formData.append('gender', gender);
      formData.append('courses', JSON.stringify(courses));
      formData.append('image', image);

      const response = await axios.post('http://localhost:3000/api/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Employee added successfully:', response.data);
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Error adding employee');
    }
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCourses([...courses, value]);
    } else {
      setCourses(courses.filter((course) => course !== value));
    }
  };

  return (
    <div className='addEmployee-outer'>
      <h2 className='addEmployeeHeading'>Add Employee</h2>
      <form className='addEmployee-inner' onSubmit={handleSubmit}>
        <div>
          <label className='addEmployeeText'>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='addEmployeeText'>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='addEmployeeText'>Mobile: </label>
          <input
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        <div>
          <label className='addEmployeeText'>Designation: </label>
          <select
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="Manager">Manager</option>
            <option value="Developer">Developer</option>
          </select>
        </div>
        <div>
          <label className='addEmployeeText'>Gender:</label>
          <label>
            <input
              type="radio"
              value="Male"
              checked={gender === 'Male'}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="Female"
              checked={gender === 'Female'}
              onChange={(e) => setGender(e.target.value)}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              value="Other"
              checked={gender === 'Other'}
              onChange={(e) => setGender(e.target.value)}
            />
            Other
          </label>
        </div>
        <div>
          <label className='addEmployeeText'>Courses:</label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={courses.includes('BCA')}
              onChange={handleCourseChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              value="MCA"
              checked={courses.includes('MCA')}
              onChange={handleCourseChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BSc"
              checked={courses.includes('BSc')}
              onChange={handleCourseChange}
            />
            BSc
          </label>
          <label>
            <input
              type="checkbox"
              value="BE"
              checked={courses.includes('BE')}
              onChange={handleCourseChange}
            />
            MSc
          </label>
        </div>
        <div>
          <label className='addEmployeeText'>Image:</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
