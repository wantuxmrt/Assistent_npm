import React, { useCallback } from 'react';
import { useAppContext } from '../../../contexts/AppContext';
import RequestTable from '../../requests/RequestTable/RequestTable';
import Button from '../../common/Button/Button';
import styles from './ModerationPanel.module.css';

const ModerationPanel = () => {
  const { state, getUsersInSameOrganization } = useAppContext();
  const [departmentRequests, setDepartmentRequests] = React.useState<any[]>([]);

  const loadDepartmentRequests = useCallback(() => {
    if (!state.currentUser) return;
    
    const usersInDept = getUsersInSameOrganization();
    const userIds = usersInDept.map(u => u.id);
    const requests = state.tickets.filter(t => userIds.includes(t.userId));
    
    setDepartmentRequests(requests);
  }, [state.currentUser, state.tickets, getUsersInSameOrganization]);

  React.useEffect(() => {
    loadDepartmentRequests();
  }, [loadDepartmentRequests]);

  if (state.currentUser?.role !== 'manager') {
    return (
      <div className={styles.accessDenied}>
        <i className="fas fa-ban"></i>
        <h3>Доступ запрещен</h3>
        <p>Только менеджеры имеют доступ к этому разделу</p>
      </div>
    );
  }

  return (
    <div className={styles.moderationPanel}>
      <div className={styles.header}>
        <h2>
          <i className="fas fa-user-tie"></i> Панель модерации
        </h2>
        <p>
          Запросы сотрудников вашего отдела: {state.currentUser.department}
        </p>
      </div>
      
      <div className={styles.controls}>
        <Button 
          onClick={loadDepartmentRequests}
          icon="sync"
        >
          Обновить
        </Button>
      </div>
      
      <RequestTable 
        requests={departmentRequests} 
        showActions={true}
        onRowClick={(request) => console.log('Request clicked', request)}
      />
      
      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h4>Всего запросов</h4>
          <p>{departmentRequests.length}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Открытые</h4>
          <p>{departmentRequests.filter(r => r.status !== 'resolved').length}</p>
        </div>
        <div className={styles.statCard}>
          <h4>Срочные</h4>
          <p>{departmentRequests.filter(r => r.priority === 'critical' || r.priority === 'high').length}</p>
        </div>
      </div>
    </div>
  );
};

export default ModerationPanel;