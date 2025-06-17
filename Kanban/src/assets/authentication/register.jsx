import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Register = () => {
  const navigate=useNavigate();
    const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const payload = {
      email: formData.email,
      password: formData.password
    };

    console.log('Submitting user:', payload);
    await axios.post('http://localhost:5000/register',payload)

    setMessage('User data prepared and password hashed.');
    setFormData({ email: '', password: '' });
    navigate('/')
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Sign Up</h2>

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

        <button type="submit"  style={styles.button}>Sign Up</button>

        {message && <p style={styles.success}>{message}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f9f9f9',
    padding: '20px'
  },
  form: {
    background: '#fff',
    padding: '30px 20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
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
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    background: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  success: {
    color: '#28a745',
    textAlign: 'center',
    fontSize: '0.9rem',
  }
};

export default Register;
