import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.png'; // Substitua pelo caminho correto da sua logo

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.254.108:5000/login', { username, password }); // Substitua pelo IP da sua máquina
      localStorage.setItem('token', response.data.token);
      onLogin(true);
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="Logo" className="login-logo" />
      {/* <h1>Login</h1> */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label>Usuário</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Senha</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
