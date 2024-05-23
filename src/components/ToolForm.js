import React, { useState } from 'react';
import axios from 'axios';

const ToolForm = ({ refreshTools }) => {
  const [toolName, setToolName] = useState('');
  const [responsible, setResponsible] = useState('');
  const [employee, setEmployee] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [status, setStatus] = useState('Em aberto');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.254.108:5000/tools', {
        toolName,
        responsible,
        employee,
        serialNumber,
        status
      }); // Substitua pelo endereço IP da sua máquina
      refreshTools();
      setToolName('');
      setResponsible('');
      setEmployee('');
      setSerialNumber('');
      setStatus('Em aberto');
    } catch (error) {
      console.error('Erro ao adicionar ferramenta', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tool-form">
      <div className="form-group">
        <label>Ferramenta:</label>
        <input type="text" value={toolName} onChange={(e) => setToolName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Descrição:</label>
        <input type="text" value={responsible} onChange={(e) => setResponsible(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>Funcionário:</label>
        <input type="text" value={employee} onChange={(e) => setEmployee(e.target.value)} required />
      </div>
      <div className="form-group">
        <label>N° Série:</label>
        <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} required />
      </div>
      <button type="submit" className="btn">Adicionar Ferramenta</button>
    </form>
  );
};

export default ToolForm;
