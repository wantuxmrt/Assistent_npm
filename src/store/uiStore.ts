import { create } from 'zustand';

interface UIState {
  activeTab: string;
  isAuthModalOpen: boolean;
  authModalType: 'login' | 'register';
  isTicketModalOpen: boolean;
  ticketModalMode: 'create' | 'edit';
  
  setActiveTab: (tab: string) => void;
  openAuthModal: (type: 'login' | 'register') => void;
  closeAuthModal: () => void;
  openTicketModal: (mode: 'create' | 'edit') => void;
  closeTicketModal: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  activeTab: 'my-requests',
  isAuthModalOpen: false,
  authModalType: 'login',
  isTicketModalOpen: false,
  ticketModalMode: 'create',
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  openAuthModal: (type) => 
    set({ isAuthModalOpen: true, authModalType: type }),
  
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  
  openTicketModal: (mode) => 
    set({ isTicketModalOpen: true, ticketModalMode: mode }),
  
  closeTicketModal: () => set({ isTicketModalOpen: false })
}));