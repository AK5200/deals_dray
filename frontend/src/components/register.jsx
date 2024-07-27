import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../components/index.css';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // State to manage error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/register', formData);
      localStorage.setItem('token', response.data.token);
      console.log('Registration successful:', response.data);
      navigate('/home');
    } catch (error) {
      if (error.response) {
        if (error.response.status === 409) {
          // User already exists, redirect to login page
          setError( error.response.data.message || error.message);
        } else {
          setError('Registration failed: ' + error.response.data.message || error.message);
        }
      } else {
        setError('Registration failed: ' + error.message);
      }
    }
  };

  return (<>  
    <div class=''>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
    </>
  );
};

export default Register;
