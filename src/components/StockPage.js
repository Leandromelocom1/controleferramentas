import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockPage = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await axios.get('http://192.168.254.108:5000/tools'); // Substitua pelo endereço IP da sua máquina
        setTools(response.data);
      } catch (error) {
        console.error("Erro ao buscar as ferramentas", error);
      }
    };
    fetchTools();
  }, []);

  const renderTool = (tool) => (
    <li key={tool._id} className="tool-item">
      <strong>Ferramenta:</strong> {tool.toolName} <br />
      <strong>Descrição:</strong> {tool.description} <br />
      <strong>Número de Série:</strong> {tool.serialNumber} <br />
      <strong>Responsável:</strong> {tool.responsible} <br />
      <strong>Status:</strong> {tool.status} <br />
    </li>
  );

  return (
    <div className="stock-container">
      <h1>ESTOQUE DE FERRAMENTAS</h1>
      <h2>Em Estoque</h2>
      <ul className="tool-list">
        {tools.filter(tool => tool.status === 'Em estoque').map(renderTool)}
      </ul>
      <h2>Ferramentas Retiradas</h2>
      <ul className="tool-list">
        {tools.filter(tool => tool.status === 'Retirada').map(renderTool)}
      </ul>
      <h2>Ferramentas em Manutenção</h2>
      <ul className="tool-list">
        {tools.filter(tool => tool.status === 'Em manutenção').map(renderTool)}
      </ul>
      <h2>Ferramentas Reparadas</h2>
      <ul className="tool-list">
        {tools.filter(tool => tool.status === 'Reparado').map(renderTool)}
      </ul>
    </div>
  );
};

export default StockPage;
