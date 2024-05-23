import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ToolRegisterForm = ({ refreshTools }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [toolId, setToolId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');

  useEffect(() => {
    setToolId(uuidv4()); // Gera um novo ID quando o componente é montado
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.254.108:5000/tools', {
        toolName: name,
        description,
        toolId,
        serialNumber,
        status: 'Em estoque'
      }); // Substitua pelo endereço IP da sua máquina
      refreshTools();
      setName('');
      setDescription('');
      setToolId(uuidv4()); // Gera um novo ID após o cadastro
      setSerialNumber('');
      alert('Ferramenta cadastrada com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar a ferramenta', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="tool-register-form">
      <h2>CADASTRO DE FERRAMENTAS</h2>
      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Descrição:</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      {/* Campo ID oculto */}
      <input
        type="hidden"
        value={toolId}
        readOnly
      />
      <div className="form-group">
        <label>S/N:</label>
        <input
          type="text"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
};

export default ToolRegisterForm;