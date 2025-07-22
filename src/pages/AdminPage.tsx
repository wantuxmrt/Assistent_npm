import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { AdminPanel } from '@/components/sections/AdminPanel';
import { ModerationPanel } from '@/components/sections/ModerationPanel';
import styles from './AdminPage.module.css';

const AdminPage = () => {
  const { user, isAuthenticated, checkPermission } = useAuth();
  
  useEffect(() => {
    if (!isAuthenticated) {
      // Редирект на страницу входа
      return;
    }
    
    if (!checkPermission('admin')) {
      // Редирект на главную с сообщением об ошибке
    }
  }, [isAuthenticated, checkPermission]);

  if (!user || !checkPermission('admin')) {
    return (
      <div className={styles.loading}>
        Проверка прав доступа...
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Панель администратора</h1>
      
      <div className={styles.grid}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Управление пользователями</h2>
          <AdminPanel />
        </section>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Модерация заявок</h2>
          <ModerationPanel />
        </section>
      </div>
    </div>
  );
};

export default AdminPage;