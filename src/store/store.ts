//import { useAuthStore } from './authStore';
//import { useRequestsStore } from './requestsStore';
//import { useUIStore } from './uiStore';

//export const useStore = () => ({
//  auth: useAuthStore(),
//  requests: useRequestsStore(),
//  ui: useUIStore()
//});

//export type RootStore = ReturnType<typeof useStore>;


import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    // Ваши редьюсеры
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;