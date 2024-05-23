// src/components/ToolForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ToolForm = ({ refreshTools }) => {
  const [toolName, setToolName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [employee, setEmployee] = useState('');
  const [status, setStatus] = useState('Em aberto');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTool = { toolName, responsible, employee, status };
      await axios.post('http://192.168.1.x:5000/tools', newTool); // Substitua 192.168.1.x pelo endereço IP da sua máquina
      setToolName('');
      setResponsible('');
      setEmployee('');
      setStatus('Em aberto');
      refreshTools();
    } catch (error) {
      console.error("Erro ao adicionar a ferramenta", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome da Ferramenta"
        value={toolName}
        onChange={(e) => setToolName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Quem está liberando"
        value={responsible}
        onChange={(e) => setResponsible(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Funcionário retirando"
        value={employee}
        onChange={(e) => setEmployee(e.target.value)}
        required
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Em aberto">Em aberto</option>
        <option value="Defeito">Defeito</option>
        <option value="Baixada">Baixada</option>
      </select>
      <button type="submit">Adicionar Ferramenta</button>
    </form>
  );
};

export default ToolForm;
