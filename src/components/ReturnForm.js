import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReturnForm = ({ refreshTools }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [toolId, setToolId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [selectedWork, setSelectedWork] = useState('');
  const [responsible, setResponsible] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [defective, setDefective] = useState(false);
  const [internalUse, setInternalUse] = useState(false); // Adicionado o estado para uso interno
  const [works, setWorks] = useState([]);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await axios.get('http://192.168.254.108:5000/works'); // Substitua pelo endereço IP da sua máquina
        setWorks(response.data);
      } catch (error) {
        console.error("Erro ao buscar as obras", error);
      }
    };
    const fetchTools = async () => {
      try {
        const response = await axios.get('http://192.168.254.108:5000/tools'); // Substitua pelo endereço IP da sua máquina
        setTools(response.data);
      } catch (error) {
        console.error("Erro ao buscar as ferramentas", error);
      }
    };
    fetchWorks();
    fetchTools();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://192.168.254.108:5000/tools/${toolId}`, {
        toolName: name,
        description,
        serialNumber,
        status: defective ? 'Defeito' : 'Em estoque',
        work: defective || internalUse ? '' : selectedWork, // Adicionada a lógica para uso interno
        responsible,
        returnDate,
      }); // Substitua pelo endereço IP da sua máquina
      refreshTools();
      setName('');
      setDescription('');
      setToolId('');
      setSerialNumber('');
      setSelectedWork('');
      setResponsible('');
      setReturnDate('');
      setDefective(false);
      setInternalUse(false); // Resetando o estado de uso interno
      alert('Ferramenta devolvida com sucesso!');
    } catch (error) {
      console.error('Erro ao devolver a ferramenta', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="return-form">
      <h2>DEVOLUÇÃO</h2>
      <div className="form-group">
        <label>Ferramenta:</label>
        <select
          value={toolId}
          onChange={(e) => {
            const selectedTool = tools.find(tool => tool._id === e.target.value);
            if (selectedTool) {
              setToolId(selectedTool._id);
              setName(selectedTool.toolName);
              setDescription(selectedTool.description);
              setSerialNumber(selectedTool.serialNumber);
            }
          }}
          required
        >
          <option value="">Selecione uma ferramenta</option>
          {tools.map(tool => (
            <option key={tool._id} value={tool._id}>{tool.toolName} - {tool.serialNumber}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Descrição:</label>
        <input
          type="text"
          value={description}
          readOnly
        />
      </div>
      <div className="form-group">
        <label>Número de Série:</label>
        <input
          type="text"
          value={serialNumber}
          readOnly
        />
      </div>
      <div className="form-group">
        <label>Responsável pela Devolução:</label>
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
        <label>Devolvido com Defeito:</label>
        <input
          type="checkbox"
          checked={defective}
          onChange={(e) => setDefective(e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label>Uso Interno:</label>
        <input
          type="checkbox"
          checked={internalUse}
          onChange={(e) => setInternalUse(e.target.checked)}
        />
      </div>
      <div className="form-group">
        <label>Obra:</label>
        <select
          value={selectedWork}
          onChange={(e) => setSelectedWork(e.target.value)}
          disabled={defective || internalUse} // Desabilitar se defeito ou uso interno estiver marcado
          required={!defective && !internalUse} // Exigir apenas se nenhum dos dois estiver marcado
        >
          <option value="">Selecione uma obra</option>
          {works.map(work => (
            <option key={work._id} value={work._id}>{work.client} - {work.workAddress}</option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn">Devolver</button>
    </form>
  );
};

export default ReturnForm;
