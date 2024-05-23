// src/components/ToolList.js
import React from 'react';
import axios from 'axios';

const ToolList = ({ tools, setTools, refreshTools }) => {
  const handleRemove = async (id) => {
    try {
      await axios.patch(`http://192.168.0.78:5000/tools/${id}`, { status: 'Baixada' }); // Substitua 192.168.1.x pelo endereço IP da sua máquina
      setTools(tools.filter(tool => tool._id !== id));
      refreshTools();
    } catch (error) {
      console.error("Erro ao atualizar a ferramenta", error);
    }
  };

  const handleDefectAndRemove = async (id) => {
    try {
      await axios.patch(`http://192.168.0.78:5000/tools/${id}`, { status: 'Defeito' }); // Substitua 192.168.1.x pelo endereço IP da sua máquina
      setTools(tools.filter(tool => tool._id !== id));
      refreshTools();
    } catch (error) {
      console.error("Erro ao atualizar a ferramenta", error);
    }
  };

  return (
    <div>
      <table id="tools-table" style={{ display: 'none' }}>
        <thead>
          <tr>
            <th>Nome da Ferramenta</th>
            <th>Liberado por</th>
            <th>Funcionário</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool._id}>
              <td>{tool.toolName}</td>
              <td>{tool.responsible}</td>
              <td>{tool.employee}</td>
              <td>{tool.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul>
        {tools.map((tool) => (
          <li key={tool._id}>
            <strong>Ferramenta:</strong> {tool.toolName} <br />
            <strong>Liberado por:</strong> {tool.responsible} <br />
            <strong>Funcionário:</strong> {tool.employee} <br />
            <strong>Status:</strong> {tool.status} <br />
            <button onClick={() => handleRemove(tool._id)}>Dar Baixa</button>
            <button onClick={() => handleDefectAndRemove(tool._id)}>Devolução com defeito</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToolList;
