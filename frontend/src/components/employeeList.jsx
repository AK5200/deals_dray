import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
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

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/employees/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
      setError('Error deleting employee');
    }
  };

  const sortEmployees = (employees) => {
    return employees.sort((a, b) => {
      if (sortOption === 'name') {
        return a.name.localeCompare(b.name);
      } else if (sortOption === 'email') {
        return a.email.localeCompare(b.email);
      } else if (sortOption === 'id') {
        return a._id.localeCompare(b._id);
      } else if (sortOption === 'date') {
        return new Date(a.createdAt) - new Date(b.createdAt);
      } else {
        return employees;
      }
    });
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.mobile.includes(searchTerm) ||
    employee.designation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedEmployees = sortEmployees(filteredEmployees);

  // Calculate pagination values
  const totalRecords = sortedEmployees.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startRecord = (currentPage - 1) * pageSize;
  const endRecord = startRecord + pageSize;
  const currentRecords = sortedEmployees.slice(startRecord, endRecord);

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
      <select onChange={handleSort} value={sortOption}>
        <option value="">Sort By</option>
        <option value="name">Name</option>
        <option value="email">Email</option>
        <option value="id">ID</option>
        <option value="date">Date</option>
      </select>
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
          {currentRecords.map((employee, index) => (
            <tr key={employee._id}>
              <td>{startRecord + index + 1}</td>
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
                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <label>Entries per page:</label>
        <select value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};



export default EmployeeList;

        