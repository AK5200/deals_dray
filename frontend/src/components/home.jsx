// src/components/home.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AddEmployee from './addEmployee';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='home-outer'>
      <nav className="home-inner">
        
            <Link to="/home" className="home-home">Home</Link>

            <Link to="/employee-list" className="home-employee">Employee List</Link>
          
            <span className="home-name">admin@example.com</span>
          
            <button onClick={handleLogout} className="home-logout">Logout</button>
          
        
      </nav>
      <div className="home-outer-p">
        <h1 className="home-p">Welcome to Admin Panel</h1>
        <AddEmployee/>
      </div>
    </div>
  );
};

export default Home;
