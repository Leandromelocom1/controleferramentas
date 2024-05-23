import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
// import axios from 'axios';
import MaintenancePage from './components/MaintenancePage';
import StockPage from './components/StockPage';
import ReportsPage from './components/ReportsPage';
import Login from './components/Login';
import WorkRegisterForm from './components/WorkRegisterForm';
import WithdrawalForm from './components/WithdrawalForm';
import ToolRegisterForm from './components/ToolRegisterForm';
import ReturnForm from './components/ReturnForm'; // Importando o componente de devolução
import './App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated ? (
          <>
            <nav>
              <Link to="/tool-register">FERRAMENTA</Link>
              <Link to="/work-register">OBRA</Link>
              <Link to="/withdrawal">RETIRAR</Link>
              <Link to="/return">DEVOLUÇÃO</Link> {/* Adicionando a guia Devolução */}
              <Link to="/maintenance">MANUTENÇÃO</Link>
              <Link to="/stock">ESTOQUE</Link>
              <Link to="/reports">RELATÓRIOS</Link>
              <button onClick={handleLogout} className="logoff">Logoff</button>
            </nav>
            <Routes>
              <Route path="/" element={<div>Bem-vindo ao Gerenciador de Ferramentas</div>} />
              <Route path="/maintenance" element={<MaintenancePage />} />
              <Route path="/stock" element={<StockPage />} />
              <Route path="/reports" element={<ReportsPage />} />
              <Route path="/work-register" element={<WorkRegisterForm />} />
              <Route path="/withdrawal" element={<WithdrawalForm refreshTools={() => {}} />} />
              <Route path="/tool-register" element={<ToolRegisterForm refreshTools={() => {}} />} />
              <Route path="/return" element={<ReturnForm refreshTools={() => {}} />} /> {/* Adicionando a rota Devolução */}
            </Routes>
          </>
        ) : (
          <Login onLogin={setIsAuthenticated} />
        )}
      </div>
    </Router>
  );
};

export default App;
