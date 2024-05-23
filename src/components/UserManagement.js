import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://192.168.254.108:5000/users'); // Substitua pelo IP da sua máquina
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
      }
    };
    fetchUsers();
  }, []);

  const handlePermissionChange = async (id, permissions) => {
    try {
      await axios.patch(`http://192.168.254.108:5000/users/${id}`, { permissions }); // Substitua pelo IP da sua máquina
      setUsers(users.map(user => (user._id === id ? { ...user, permissions } : user)));
    } catch (error) {
      console.error('Erro ao atualizar permissões', error);
    }
  };

  return (
    <div className="user-management-container">
      <h1>Usuários</h1>
      <ul className="user-list">
        {users.map(user => (
          <li key={user._id} className="user-item">
            <strong>Usuário:</strong> {user.username} <br />
            <strong>Permissões:</strong>
            <input
              type="text"
              value={user.permissions.join(', ')}
              onChange={e => handlePermissionChange(user._id, e.target.value.split(',').map(p => p.trim()))}
              className="permissions-input"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
