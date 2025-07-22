import React from 'react';
import styles from './Tab.module.css';

interface TabProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ label, active = false, onClick, icon }) => {
  return (
    <div
      className={`${styles.tab} ${active ? styles.active : ''}`}
      onClick={onClick}
    >
      {icon && <span className={styles.icon}>{icon}</span>}
      {label}
    </div>
  );
};

export default Tab;