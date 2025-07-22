import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { User, Request } from '../../../types';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import RequestTable from '../../requests/RequestTable/RequestTable';
import styles from './AdminPanel.module.css';

const AdminPanel = () => {
  const { state, updateTicket, getUsers } = useAppContext();
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editUser, setEditUser] = useState<User | null>(null);
  const [viewRequestsUserId, setViewRequestsUserId] = useState<number | null>(null);
  const [userRequests, setUserRequests] = useState<Request[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();
      setUsers(users);
    };
    fetchUsers();
  }, [getUsers]);

  const handleUserSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  }, []);

  const handleEditUser = useCallback((user: User) => {
    setEditUser(user);
    setViewRequestsUserId(null);
  }, []);

  const handleViewRequests = useCallback(async (userId: number) => {
    const requests = state.tickets.filter(t => t.userId === userId);
    setUserRequests(requests);
    setViewRequestsUserId(userId);
    setEditUser(null);
  }, [state.tickets]);

  const handleToggleUserStatus = useCallback(async (user: User) => {
    await updateTicket({
      ...user,
      active: !user.active
    });
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, active: !u.active } : u));
  }, [updateTicket]);

  const handleSaveUser = useCallback(async () => {
    if (!editUser) return;
    
    await updateTicket(editUser);
    setUsers(prev => prev.map(u => u.id === editUser.id ? editUser : u));
    setEditUser(null);
  }, [editUser, updateTicket]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm) || 
    user.email.toLowerCase().includes(searchTerm)
  );

  if (state.currentUser?.role !== 'admin') {
    return (
      <div className={styles.adminDenied}>
        <i className={`fas fa-ban ${styles.deniedIcon}`}></i>
        <h3>Доступ запрещен</h3>
        <p>У вас недостаточно прав для просмотра этого раздела</p>
      </div>
    );
  }

  return (
    <div className={styles.adminPanel}>
      <div className={styles.section}>
        <h3>Управление запросами</h3>
        <RequestTable 
          requests={state.tickets} 
          showActions={true} 
          onRowClick={() => {}} 
        />
      </div>

      <div className={styles.section}>
        <h3>Управление пользователями</h3>
        
        <div className={styles.searchBox}>
          <i className="fas fa-search"></i>
          <Input 
            type="text"
            placeholder="Поиск по пользователям..."
            value={searchTerm}
            onChange={handleUserSearch}
          />
        </div>
        
        {viewRequestsUserId && (
          <div className={styles.userRequestsSection}>
            <h4>Запросы пользователя</h4>
            <Button 
              variant="secondary"
              onClick={() => setViewRequestsUserId(null)}
              icon="arrow-left"
            >
              Назад
            </Button>
            <RequestTable 
              requests={userRequests} 
              showActions={true} 
              onRowClick={() => {}} 
            />
          </div>
        )}
        
        {editUser ? (
          <div className={styles.editUserForm}>
            <h4>Редактирование пользователя</h4>
            <div className={styles.formGroup}>
              <label>Имя:</label>
              <Input 
                type="text"
                value={editUser.name}
                onChange={(e) => setEditUser({...editUser, name: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <Input 
                type="email"
                value={editUser.email}
                disabled
              />
            </div>
            <div className={styles.formGroup}>
              <label>Роль:</label>
              <Select 
                value={editUser.role}
                onChange={(e) => setEditUser({...editUser, role: e.target.value as any})}
                options={[
                  { value: 'user', label: 'Пользователь' },
                  { value: 'support', label: 'Поддержка' },
                  { value: 'admin', label: 'Администратор' },
                  { value: 'manager', label: 'Менеджер' },
                ]}
              />
            </div>
            <div className={styles.buttonGroup}>
              <Button onClick={handleSaveUser}>Сохранить</Button>
              <Button variant="secondary" onClick={() => setEditUser(null)}>
                Отмена
              </Button>
            </div>
          </div>
        ) : !viewRequestsUserId && (
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Статус</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === 'admin' ? 'Администратор' : 
                     user.role === 'support' ? 'Поддержка' : 
                     user.role === 'manager' ? 'Менеджер' : 'Пользователь'}
                  </td>
                  <td className={user.active ? styles.active : styles.inactive}>
                    {user.active ? 'Активен' : 'Заблокирован'}
                  </td>
                  <td className={styles.actions}>
                    <Button 
                      size="small"
                      onClick={() => handleEditUser(user)}
                      icon="edit"
                    >
                      Редактировать
                    </Button>
                    <Button 
                      size="small"
                      variant="secondary"
                      onClick={() => handleViewRequests(user.id)}
                      icon="list"
                    >
                      Заявки
                    </Button>
                    <Button 
                      size="small"
                      variant={user.active ? 'danger' : 'success'}
                      onClick={() => handleToggleUserStatus(user)}
                      icon={user.active ? 'lock' : 'unlock'}
                    >
                      {user.active ? 'Заблокировать' : 'Разблокировать'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;