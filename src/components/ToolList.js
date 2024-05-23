import React from 'react';
import axios from 'axios';

const ToolList = ({ tools, setTools, refreshTools }) => {
  const handleRemove = async (id) => {
    try {
      await axios.patch(`http://192.168.254.108:5000/tools/${id}`, { status: 'Baixada' }); // Substitua pelo endereço IP da sua máquina
      refreshTools();
    } catch (error) {
      console.error("Erro ao dar baixa na ferramenta", error);
    }
  };

  const handleDefect = async (id) => {
    try {
      await axios.patch(`http://192.168.254.108:5000/tools/${id}`, { status: 'Defeito' }); // Substitua pelo endereço IP da sua máquina
      refreshTools();
    } catch (error) {
      console.error("Erro ao marcar a ferramenta como defeituosa", error);
    }
  };

  return (
    <div className="tool-list-container">
      <h2>Lista de Ferramentas</h2>
      <ul className="tool-list">
        {tools.map(tool => (
          <li key={tool._id} className="tool-item">
            <strong>Ferramenta:</strong> {tool.toolName} <br />
            <strong>Descrição:</strong> {tool.responsible} <br />
            <strong>Funcionário:</strong> {tool.employee} <br />
            <strong>N° Série:</strong> {tool.serialNumber} <br />
            <strong>Status:</strong> {tool.status} <br />
            <button onClick={() => handleRemove(tool._id)} className="btn btn-remove">Dar Baixa</button>
            <button onClick={() => handleDefect(tool._id)} className="btn btn-defect">Baixa com Defeito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolList;
