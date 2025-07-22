import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { AuthModal } from '@/components/auth/AuthModal';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (credentials: { email: string; password: string }) => {
    try {
      await login(credentials.email, credentials.password);
      navigate('/');
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.background} />
      
      <div className={styles.modalWrapper}>
        <AuthModal 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onSubmit={handleSubmit}
          onSuccess={() => navigate('/profile')}
        />
      </div>
    </div>
  );
};

export default LoginPage;