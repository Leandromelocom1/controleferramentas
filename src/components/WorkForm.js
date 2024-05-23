import React, { useState } from 'react';
import axios from 'axios';

const WorkForm = ({ refreshWorks }) => {
  const [quantity, setQuantity] = useState('');
  const [name, setName] = useState('');
  const [workId, setWorkId] = useState('');
  const [work, setWork] = useState('');
  const [responsible, setResponsible] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [partialReturn, setPartialReturn] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.254.108:5000/works', {
        quantity,
        name,
        workId,
        work,
        responsible,
        returnDate,
        partialReturn,
      }); // Substitua pelo endereço IP da sua máquina
      refreshWorks();
      setQuantity('');
      setName('');
      setWorkId('');
      setWork('');
      setResponsible('');
      setReturnDate('');
      setPartialReturn('');
    } catch (error) {
      console.error('Erro ao adicionar obra', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="work-form">
      <h2>Cadastrar Obra</h2>
      <div className="form-group">
        <label>Quantidade:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
      </div>
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
        <label>ID:</label>
        <input
          type="text"
          value={workId}
          onChange={(e) => setWorkId(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Obra:</label>
        <input
          type="text"
          value={work}
          onChange={(e) => setWork(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Responsável pela Retirada:</label>
        <input
          type="text"
          value={responsible}
          onChange={(e) => setResponsible(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Data de Retorno:</label>
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Retorno Parcial:</label>
        <input
          type="text"
          value={partialReturn}
          onChange={(e) => setPartialReturn(e.target.value)}
        />
      </div>
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
};

export default WorkForm;
