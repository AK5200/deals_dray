import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

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
      const response = await axios.post('http://localhost:3000/api/auth/login', formData);
      localStorage.setItem('token', response.data.token);
      navigate('/home')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error('Invalid credentials');
      } else {
        console.error('Login failed:', error);
      }
    }
  };

  return (
    <div className="login-outer">
    <form className='login-inner' onSubmit={handleSubmit}>
      <input
      className='login-email'
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
      className='login-password'
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <button className='login-button' type="submit">Login</button>
    </form>
    </div>
  );
};

export default Login;
