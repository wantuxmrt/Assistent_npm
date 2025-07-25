import React from 'react';
import styles from './MainPage.module.css';
import { AppHeader } from '@/components/common';
import { RequestCard, RequestTable } from '@/components/requests';
import { CreateRequest, HelpSection } from '@/components/sections';
import { Ticket } from '@/types';

const MainPage = () => {
  const requests: Ticket[] = [
    {
      id: 1,
      system: '1c',
      category: 'category1',
      title: 'Заявка #1',
      description: 'Описание заявки #1',
      status: 'new',
      priority: 'high',
      created: '2023-10-15T12:00:00Z',
      userId: 1,
      assignedTo: null, // Теперь соответствует типу
      comments: [],
      attachments: [],
    },
    {
      id: 2,
      system: 'mis',
      category: 'category2',
      title: 'Заявка #2',
      description: 'Описание заявки #2',
      status: 'resolved',
      priority: 'medium',
      created: '2023-10-10T14:30:00Z',
      userId: 2,
      assignedTo: 3,
      comments: [],
      attachments: [],
    },
  ];

  const handleCardClick = (requestId: number) => {
    console.log('Карточка заявки нажата', requestId);
    // В реальном приложении здесь будет навигация на страницу заявки
  };

  const handleRowClick = (request: Ticket) => {
    console.log('Строка таблицы нажата', request.id);
    // В реальном приложении здесь будет навигация на страницу заявки
  };

  return (
    <div className={styles.container}>
      <AppHeader />
      
      <main className={styles.content}>
        <section className={styles.section}>
          <h2 className={styles.title}>Последние заявки</h2>
          <div className={styles.cardsContainer}>
            {requests.map(request => (
              <RequestCard 
                key={request.id}
                request={request} 
                className={styles.card}
                onClick={() => handleCardClick(request.id)}
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>История заявок</h2>
          <RequestTable 
            requests={requests} 
            onRowClick={handleRowClick}
          />
        </section>
      </main>

      <aside className={styles.sidebar}>
        <CreateRequest />
        <HelpSection />
      </aside>
    </div>
  );
};

export default MainPage;