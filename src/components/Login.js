// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulação de login simples. Substitua esta lógica pela sua lógica de autenticação real.
    if (username === 'teste' && password === 'teste') {
        
      onLogin(true);
    } else {
      alert('Credenciais inválidas!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Usuário</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Senha</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
