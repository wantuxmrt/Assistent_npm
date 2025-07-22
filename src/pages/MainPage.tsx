import React from 'react';
import styles from './MainPage.module.css';
import { AppHeader } from '@/components/AppHeader';
import { RequestCard } from '@/components/requests/RequestCard';
import { RequestTable } from '@/components/requests/RequestTable';
import { CreateRequest } from '@/components/sections/CreateRequest';
import { HelpSection } from '@/components/sections/HelpSection';

const MainPage = () => {
  const requests = [
    { id: 1, title: 'Заявка #1', status: 'В обработке', date: '2023-10-15' },
    { id: 2, title: 'Заявка #2', status: 'Выполнено', date: '2023-10-10' },
  ];

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
              />
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.title}>История заявок</h2>
          <RequestTable requests={requests} />
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