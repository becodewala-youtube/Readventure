export type BookStatus = 'to-read' | 'reading' | 'finished';

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  status: BookStatus;
  progress: number;
  totalPages: number;
  tags: string[];
  goalDate?: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  isHighlight: boolean;
  createdAt: string;
}

export interface ReadingGoal {
  dailyPages: number;
  weeklyBooks: number;
}