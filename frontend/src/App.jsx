// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import PrivateRoute from './components/privateRoutes';
import EmployeeList from './components/employeeList';
import AddEmployee from './components/addEmployee';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/add-employee" element={<PrivateRoute element={<AddEmployee />} />} />
        <Route path="/employee-list" element={<PrivateRoute element={<EmployeeList />} />} />
      </Routes>
    </Router>
  );
}

export default App;
