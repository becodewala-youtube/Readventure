import { Book } from '../types';
import { BookOpen, CheckCircle2, Clock, Edit3, Trash2 } from 'lucide-react';

interface BookCardProps {
  book: Book;
  onStatusChange: (id: string, status: Book['status']) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BookCard({ book, onStatusChange, onEdit, onDelete }: BookCardProps) {
  const statusIcons = {
    'to-read': <Clock className="w-5 h-5 text-blue-500" />,
    'reading': <BookOpen className="w-5 h-5 text-yellow-500" />,
    'finished': <CheckCircle2 className="w-5 h-5 text-green-500" />
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="aspect-[2/3] relative overflow-hidden">
        <img
          src={book.coverUrl || 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=300'}
          alt={book.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold truncate">{book.title}</h3>
          <p className="text-gray-300 text-sm">{book.author}</p>
        </div>
      </div>

      {book.status === 'reading' && (
        <div className="px-4 py-2">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Progress
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {Math.round((book.progress / book.totalPages) * 100)}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${(book.progress / book.totalPages) * 100}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              />
            </div>
          </div>
        </div>
      )}

      <div className="p-4 flex items-center justify-between">
        <div className="flex space-x-2">
          {book.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
        {statusIcons[book.status]}
      </div>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex space-x-2">
          <button
            onClick={() => onEdit(book.id)}
            className="p-1 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-lg"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(book.id)}
            className="p-1 rounded-full bg-white/90 hover:bg-white text-red-500 shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}