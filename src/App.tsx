import React, { useEffect } from 'react';
import Router from './routes/Router'; // Изменено на импорт по умолчанию
import AppHeader from './components/common/AppHeader/AppHeader'; // Исправлен путь
import { Sidebar } from './components/common/Sidebar/Sidebar'; // Исправлен путь
import { MainContent } from './components/common/MainContent/MainContent'; // Исправлен путь
import { useAuth } from './hooks/useAuth';
import { fetchUserData } from './store/authStore'; // Исправлен путь
import { useAppDispatch } from './store/hooks'; // Исправлен путь
import { AppContainer, ContentWrapper } from './App.styles';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchUserData());
    }
  }, [isAuthenticated, dispatch]);

  return (
    <AppContainer>
      <AppHeader />
      <ContentWrapper>
        {isAuthenticated && <Sidebar />}
        <MainContent>
          <Router />
        </MainContent>
      </ContentWrapper>
    </AppContainer>
  );
}

export default App;