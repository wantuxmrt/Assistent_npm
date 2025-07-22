export interface Request {
  id: number;
  system: '1c' | 'mis';
  category: string;
  title: string;
  description: string;
  status: 'new' | 'in-progress' | 'resolved' | 'reopened';
  priority: 'critical' | 'high' | 'medium' | 'low';
  created: string;
  userId: number;
  assignedTo: number | null;
  comments: Comment[];
  attachments: string[];
}

export interface Comment {
  author: string;
  time: string;
  text: string;
}

export interface RequestFormData {
  title: string;
  description: string;
  attachments: string[];
  files?: File[]; // Для временного хранения файлов перед загрузкой
}