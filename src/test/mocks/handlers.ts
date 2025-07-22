import { rest } from 'msw';
import { mockUsers, mockTickets } from './mockData';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const handlers = [
  // Аутентификация
  rest.post(`${API_URL}/auth/login`, (req, res, ctx) => {
    const { email, password } = req.body as any;
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res(
        ctx.status(401),
        ctx.json({ message: 'Неверные учетные данные' })
      );
    }

    return res(
      ctx.status(200),
      ctx.json({ 
        user, 
        token: 'mock-access-token' 
      })
    );
  }),

  rest.post(`${API_URL}/auth/register`, (req, res, ctx) => {
    const { email, password, role, organization, department } = req.body as any;
    
    if (mockUsers.some(u => u.email === email)) {
      return res(
        ctx.status(400),
        ctx.json({ message: 'Пользователь с таким email уже существует' })
      );
    }

    const newUser = {
      id: Math.max(...mockUsers.map(u => u.id)) + 1,
      name: email.split('@')[0],
      email,
      role,
      avatar: email[0].toUpperCase(),
      password,
      active: true,
      organization,
      department
    };

    mockUsers.push(newUser);
    
    return res(
      ctx.status(201),
      ctx.json({ user: newUser })
    );
  }),

  rest.post(`${API_URL}/auth/logout`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ message: 'Успешный выход' })
    );
  }),

  // Запросы
  rest.get(`${API_URL}/requests`, (req, res, ctx) => {
    const status = req.url.searchParams.get('status');
    const priority = req.url.searchParams.get('priority');
    const system = req.url.searchParams.get('system');
    
    let filteredTickets = [...mockTickets];
    
    if (status && status !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.status === status);
    }
    
    if (priority && priority !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.priority === priority);
    }
    
    if (system && system !== 'all') {
      filteredTickets = filteredTickets.filter(t => t.system === system);
    }
    
    return res(
      ctx.status(200),
      ctx.json(filteredTickets)
    );
  }),

  rest.get(`${API_URL}/requests/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const ticket = mockTickets.find(t => t.id === Number(id));
    
    if (!ticket) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Запрос не найден' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json(ticket)
    );
  }),

  rest.post(`${API_URL}/requests`, (req, res, ctx) => {
    const newTicket = {
      ...(req.body as any),
      id: Math.max(...mockTickets.map(t => t.id)) + 1,
      created: new Date().toISOString(),
      status: 'new',
      comments: [],
    };
    
    mockTickets.push(newTicket);
    
    return res(
      ctx.status(201),
      ctx.json(newTicket)
    );
  }),

  rest.patch(`${API_URL}/requests/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const updates = req.body as any;
    
    const index = mockTickets.findIndex(t => t.id === Number(id));
    
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Запрос не найден' })
      );
    }
    
    mockTickets[index] = { ...mockTickets[index], ...updates };
    
    return res(
      ctx.status(200),
      ctx.json(mockTickets[index])
    );
  }),

  // Пользователи
  rest.get(`${API_URL}/users`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json(mockUsers)
    );
  }),

  rest.get(`${API_URL}/users/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === Number(id));
    
    if (!user) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Пользователь не найден' })
      );
    }
    
    return res(
      ctx.status(200),
      ctx.json(user)
    );
  }),

  rest.patch(`${API_URL}/users/:id`, (req, res, ctx) => {
    const { id } = req.params;
    const updates = req.body as any;
    
    const index = mockUsers.findIndex(u => u.id === Number(id));
    
    if (index === -1) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'Пользователь не найден' })
      );
    }
    
    mockUsers[index] = { ...mockUsers[index], ...updates };
    
    return res(
      ctx.status(200),
      ctx.json(mockUsers[index])
    );
  }),
];

// Экспорт сервера для использования в тестах
import { setupServer } from 'msw/node';
export const server = setupServer(...handlers);