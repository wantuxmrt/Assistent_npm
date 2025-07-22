import { create } from 'zustand';
import { Ticket, TicketStatus, Priority, TicketSystem } from '../types/app.d';

interface RequestsState {
  tickets: Ticket[];
  selectedTicket: Ticket | null;
  filters: {
    system: TicketSystem | 'all';
    status: TicketStatus | 'all';
    priority: Priority | 'all';
    search: string;
  };
  viewMode: 'grid' | 'list';
  
  fetchTickets: () => Promise<void>;
  createTicket: (ticket: Omit<Ticket, 'id' | 'created'>) => Promise<Ticket>;
  updateTicket: (id: number, updates: Partial<Ticket>) => Promise<void>;
  deleteTicket: (id: number) => Promise<void>;
  selectTicket: (ticket: Ticket | null) => void;
  setFilters: (filters: Partial<RequestsState['filters']>) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  addComment: (ticketId: number, text: string, author: string) => void;
}

export const useRequestsStore = create<RequestsState>((set) => ({
  tickets: [],
  selectedTicket: null,
  filters: {
    system: 'all',
    status: 'all',
    priority: 'all',
    search: ''
  },
  viewMode: 'grid',
  
  fetchTickets: async () => {
    // В реальном приложении здесь будет вызов API
    const mockTickets: Ticket[] = [
      {
        id: 1,
        system: '1c',
        category: 'Ошибки > Не работает',
        title: 'Ошибка при проведении документа',
        description: 'При попытке провести документ "Поступление товаров" возникает ошибка "Недостаточно прав"',
        status: 'in-progress',
        priority: 'high',
        created: new Date().toISOString(),
        userId: 1,
        assignedTo: 2,
        comments: [],
        attachments: []
      }
    ];
    
    set({ tickets: mockTickets });
  },
  
  createTicket: async (ticket) => {
    const newTicket = {
      ...ticket,
      id: Date.now(),
      created: new Date().toISOString(),
      status: 'new' as TicketStatus
    };
    
    set((state) => ({
      tickets: [...state.tickets, newTicket]
    }));
    
    return newTicket;
  },
  
  updateTicket: async (id, updates) => {
    set((state) => ({
      tickets: state.tickets.map(ticket => 
        ticket.id === id ? { ...ticket, ...updates } : ticket
      )
    }));
  },
  
  deleteTicket: async (id) => {
    set((state) => ({
      tickets: state.tickets.filter(ticket => ticket.id !== id)
    }));
  },
  
  selectTicket: (ticket) => set({ selectedTicket: ticket }),
  
  setFilters: (filters) => 
    set((state) => ({ 
      filters: { ...state.filters, ...filters } 
    })),
  
  setViewMode: (mode) => set({ viewMode: mode }),
  
  addComment: (ticketId, text, author) => {
    set((state) => ({
      tickets: state.tickets.map(ticket => {
        if (ticket.id === ticketId) {
          const newComment = {
            author,
            text,
            time: new Date().toISOString()
          };
          return {
            ...ticket,
            comments: [...ticket.comments, newComment]
          };
        }
        return ticket;
      })
    }));
  }
}));