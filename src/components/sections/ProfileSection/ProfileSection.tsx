import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import { User } from '../../../types';
import Button from '../../common/Button/Button';
import Card from '../../common/Card/Card';
import Input from '../../common/Input/Input';
import Select from '../../common/Select/Select';
import styles from './ProfileSection.module.css';

const ProfileSection = () => {
  const { state, updateUser } = useAppContext();
  const [userData, setUserData] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [stats, setStats] = useState({
    totalRequests: 0,
    openRequests: 0,
    resolvedRequests: 0,
  });

  useEffect(() => {
    if (state.currentUser) {
      setUserData(state.currentUser);
      
      // Рассчет статистики
      const userRequests = state.tickets.filter(t => t.userId === state.currentUser?.id);
      setStats({
        totalRequests: userRequests.length,
        openRequests: userRequests.filter(r => r.status !== 'resolved').length,
        resolvedRequests: userRequests.filter(r => r.status === 'resolved').length,
      });
    }
  }, [state.currentUser, state.tickets]);

  const handleInputChange = useCallback((field: keyof User, value: string) => {
    setUserData(prev => prev ? { ...prev, [field]: value } : null);
  }, []);

  const handleSave = useCallback(async () => {
    if (userData) {
      await updateUser(userData);
      setEditMode(false);
    }
  }, [userData, updateUser]);

  if (!state.currentUser || !userData) {
    return (
      <div className={styles.notAuth}>
        <i className="fas fa-exclamation-triangle"></i>
        <h3>Требуется авторизация</h3>
        <p>Для просмотра профиля войдите в систему</p>
        <Button onClick={() => {/* Навигация на страницу входа */}}>
          Войти
        </Button>
      </div>
    );
  }

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin': return 'Администратор';
      case 'support': return 'Поддержка';
      case 'manager': return 'Менеджер';
      default: return 'Пользователь';
    }
  };

  return (
    <div className={styles.profileSection}>
      <div className={styles.profileHeader}>
        <div className={styles.avatar}>
          {userData.name.substring(0, 2).toUpperCase()}
        </div>
        <h2>{userData.name}</h2>
        <div className={`${styles.role} ${styles[userData.role]}`}>
          {getRoleLabel(userData.role)}
        </div>
        <p>
          {userData.organization} / {userData.department}
        </p>
      </div>
      
      <div className={styles.statsSection}>
        <Card className={styles.statCard}>
          <h3>{stats.totalRequests}</h3>
          <p>Всего запросов</p>
        </Card>
        <Card className={styles.statCard}>
          <h3>{stats.openRequests}</h3>
          <p>Открытые</p>
        </Card>
        <Card className={styles.statCard}>
          <h3>{stats.resolvedRequests}</h3>
          <p>Решенные</p>
        </Card>
        <Card className={styles.statCard}>
          <h3>{userData.active ? 'Активен' : 'Заблокирован'}</h3>
          <p>Статус аккаунта</p>
        </Card>
      </div>
      
      <div className={styles.profileForm}>
        <h3>Личные данные</h3>
        
        <div className={styles.formGroup}>
          <label>Имя</label>
          {editMode ? (
            <Input
              value={userData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
            />
          ) : (
            <p>{userData.name}</p>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label>Email</label>
          <p>{userData.email}</p>
        </div>
        
        <div className={styles.formGroup}>
          <label>Организация</label>
          {editMode ? (
            <Select
              value={userData.organization}
              onChange={(e) => handleInputChange('organization', e.target.value)}
              options={[
                { value: 'org1', label: 'Организация 1' },
                { value: 'org2', label: 'Организация 2' },
                { value: 'org3', label: 'Организация 3' },
              ]}
            />
          ) : (
            <p>{userData.organization}</p>
          )}
        </div>
        
        <div className={styles.formGroup}>
          <label>Отдел</label>
          {editMode ? (
            <Select
              value={userData.department}
              onChange={(e) => handleInputChange('department', e.target.value)}
              options={[
                { value: 'dep1', label: 'Отдел поддержки' },
                { value: 'dep2', label: 'Бухгалтерия' },
                { value: 'dep3', label: 'ИТ отдел' },
                { value: 'dep4', label: 'Отдел продаж' },
              ]}
            />
          ) : (
            <p>{userData.department}</p>
          )}
        </div>
        
        {editMode && (
          <div className={styles.formGroup}>
            <label>Новый пароль</label>
            <Input
              type="password"
              placeholder="Оставьте пустым, чтобы не менять"
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
          </div>
        )}
        
        <div className={styles.actions}>
          {editMode ? (
            <>
              <Button onClick={handleSave}>Сохранить</Button>
              <Button variant="secondary" onClick={() => setEditMode(false)}>
                Отмена
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)} icon="edit">
              Редактировать профиль
            </Button>
          )}
        </div>
      </div>
      
      <div className={styles.quickActions}>
        <Button 
          variant="secondary"
          icon="plus-circle"
          onClick={() => {/* Навигация на создание запроса */}}
        >
          Создать запрос
        </Button>
        <Button 
          variant="secondary"
          icon="ticket-alt"
          onClick={() => {/* Навигация на мои запросы */}}
        >
          Мои запросы
        </Button>
        <Button 
          variant="danger"
          icon="sign-out-alt"
          onClick={() => {/* Выход из системы */}}
        >
          Выйти
        </Button>
      </div>
    </div>
  );
};

export default ProfileSection;