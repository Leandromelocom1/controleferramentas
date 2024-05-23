import React, { useState } from 'react';
import axios from 'axios';

const WorkRegisterForm = ({ refreshWorks }) => {
  const [client, setClient] = useState('');
  const [workAddress, setWorkAddress] = useState('');
  const [workPeriod, setWorkPeriod] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.254.108:5000/works', {
        client,
        workAddress,
        workPeriod,
      }); // Substitua pelo endereço IP da sua máquina
      refreshWorks();
      setClient('');
      setWorkAddress('');
      setWorkPeriod('');
      alert('Obra cadastrada com sucesso!'); // Adicionando o alerta de sucesso
    } catch (error) {
      console.error('Erro ao adicionar obra', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="work-register-form">
      <h2>CADASTRO DE OBRAS</h2>
      <div className="form-group">
        <label>Cliente:</label>
        <input
          type="text"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Endereço da Obra:</label>
        <input
          type="text"
          value={workAddress}
          onChange={(e) => setWorkAddress(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Período da Obra:</label>
        <input
          type="text"
          value={workPeriod}
          onChange={(e) => setWorkPeriod(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
};

export default WorkRegisterForm;
