import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaintenancePage = () => {
  const [defectiveTools, setDefectiveTools] = useState([]);

  useEffect(() => {
    const fetchDefectiveTools = async () => {
      try {
        const response = await axios.get('http://192.168.254.108:5000/tools', { params: { status: 'Defeito' } }); // Substitua pelo endereço IP da sua máquina
        setDefectiveTools(response.data);
      } catch (error) {
        console.error("Erro ao buscar as ferramentas com defeito", error);
      }
    };
    fetchDefectiveTools();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`http://192.168.254.108:5000/tools/${id}`, { status }); // Substitua pelo endereço IP da sua máquina
      setDefectiveTools(defectiveTools.map(tool => tool._id === id ? { ...tool, status } : tool));
    } catch (error) {
      console.error("Erro ao atualizar o status da ferramenta", error);
    }
  };

  const handleRepair = async (id) => {
    try {
      await axios.patch(`http://192.168.254.108:5000/tools/${id}`, { status: 'Em estoque' }); // Atualiza o status para 'Em estoque'
      setDefectiveTools(defectiveTools.filter(tool => tool._id !== id)); // Remove a ferramenta da lista de defeitos
    } catch (error) {
      console.error("Erro ao marcar a ferramenta como reparada", error);
    }
  };

  return (
    <div className="maintenance-container">
      <h1>GESTÃO DE MANUTENÇÃO</h1>
      <ul className="tool-list">
        {defectiveTools.map((tool) => (
          <li key={tool._id} className="tool-item">
            <strong>Ferramenta:</strong> {tool.toolName} <br />
            <strong>Liberado por:</strong> {tool.responsible} <br />
            <strong>Funcionário:</strong> {tool.employee} <br />
            <strong>Status:</strong> {tool.status} <br />
            <button onClick={() => handleUpdateStatus(tool._id, 'Em manutenção')} className="btn btn-status">Marcar como Em Manutenção</button>
            <button onClick={() => handleRepair(tool._id)} className="btn btn-status">Marcar como Reparado</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenancePage;
