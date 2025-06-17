import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const LoginForm = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      localStorage.setItem('token', response.data.token);
      if (response.status === 200) {
        navigate('/kanban'); 
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert(error.response?.data?.message || 'Login failed');
    }
  };

 

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Login</button>

        <div style={styles.signupSection}>
          <span>Don’t have an account?</span>
          <button
            type="button"
            onClick={()=>{navigate('/register')}}
            style={styles.signupButton}
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    padding: '20px',
    background: '#f4f4f4',
  },
  form: {
    background: '#fff',
    padding: '30px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    background: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  signupSection: {
    textAlign: 'center',
    marginTop: '10px',
  },
  signupButton: {
    marginTop: '8px',
    padding: '8px 12px',
    fontSize: '0.95rem',
    background: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  }
};

export default LoginForm;
