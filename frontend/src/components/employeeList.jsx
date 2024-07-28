// src/components/EmployeeList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/employees');
        setEmployees(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching employee data');
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.mobile.includes(searchTerm) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <div className='home-outer'>
        <nav className="home-inner">
          <Link to="/home" className="home-home">Home</Link>
          <Link to="/employee-list" className="home-employee">Employee List</Link>
          <span className="home-name">admin@example.com</span>
          <button onClick={handleLogout} className="home-logout">Logout</button>
        </nav>
      </div>
      <h1>Employee List</h1>
      <input
        type="text"
        placeholder="Search employees..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <table>
        <thead>
          <tr>
            <th>Unique Id</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>
                {employee.image && (
                  <img
                    src={`http://localhost:3000/${employee.image}`}
                    alt={employee.name}
                    style={{ width: '50px', height: '50px' }}
                  />
                )}
              </td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.mobile}</td>
              <td>{employee.designation}</td>
              <td>{employee.gender}</td>
              <td>{employee.courses.join(', ')}</td>
              <td>{new Date(employee.createdAt).toLocaleDateString()}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
