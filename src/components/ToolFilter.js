// src/components/ToolFilter.js
import React from 'react';

const ToolFilter = ({ filterTools }) => {
  const handleFilterChange = (e) => {
    filterTools(e.target.value);
  };

  return (
    <div>
      <select onChange={handleFilterChange}>
        <option value="All">Todos</option>
        <option value="Em aberto">Em aberto</option>
        <option value="Defeito">Defeito</option>
        <option value="Baixada">Baixada</option>
      </select>
    </div>
  );
};

export default ToolFilter;
