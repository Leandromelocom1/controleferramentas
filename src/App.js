// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ToolForm from './components/ToolForm';
import ToolList from './components/ToolList';
import ToolFilter from './components/ToolFilter';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [tools, setTools] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchTools = async (status = 'Todas') => {
    try {
      const response = await axios.get('http://192.168.0.78:5000/tools', { params: { status } }); // Substitua 192.168.1.x pelo endereço IP da sua máquina
      setTools(response.data);
      setFilteredTools(response.data);
    } catch (error) {
      console.error("Erro ao buscar as ferramentas", error);
    }
  };

  const filterTools = (status) => {
    fetchTools(status);
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchTools();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <>
          <h1>Gerenciador de Ferramentas</h1>
          <button onClick={handleLogout} className="logoff">Logoff</button>
          <ToolForm refreshTools={() => fetchTools()} />
          <ToolFilter filterTools={filterTools} />
          <ToolList tools={filteredTools} setTools={setFilteredTools} refreshTools={() => fetchTools()} />
        </>
      ) : (
        <Login onLogin={setIsAuthenticated} />
      )}
    </div>
  );
};

export default App;
