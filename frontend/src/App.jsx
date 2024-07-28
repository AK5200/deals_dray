import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import PrivateRoute from './components/privateRoutes';
import EmployeeList from './components/employeeList';
import EditEmployee from './components/editEmployee'; // Import the EditEmployee component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/employee-list" element={<PrivateRoute element={<EmployeeList />} />} />
        <Route path="/edit-employee/:id" element={<PrivateRoute element={<EditEmployee />} />} /> {/* Add the edit route */}
      </Routes>
    </Router>
  );
}

export default App;
