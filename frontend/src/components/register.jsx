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
    <div className='register-outer'>
      <form className='register-inner' onSubmit={handleSubmit}>
        <input
         className='register-email'
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
        className='register-password'
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button className='register-button' type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <p className='register-p'>
        Already have an account? <Link to="/login" className='register-login'>Login here</Link>
      </p>
    </div>
    </>
  );
};

export default Register;
