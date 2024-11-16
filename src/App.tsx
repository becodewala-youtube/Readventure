import React, { useState } from 'react';
import { Book, BookStatus } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { BookCard } from './components/BookCard';
import { AddBookModal } from './components/AddBookModal';
import { PlusCircle, Moon, Sun, BookOpen } from 'lucide-react';
import Icon from './assets/icon.png'

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [editingBook, setEditingBook] = useState<Book | undefined>(undefined);

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleAddBook = (newBook: Omit<Book, 'id'>) => {
    setBooks([...books, { ...newBook, id: crypto.randomUUID() }]);
  };

  const handleUpdateBook = (id: string, updatedBook: Partial<Book>) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, ...updatedBook } : book
    ));
  };

  const handleStatusChange = (id: string, status: BookStatus) => {
    setBooks(books.map(book => 
      book.id === id ? { ...book, status } : book
    ));
  };

  const handleDeleteBook = (id: string) => {
    setBooks(books.filter(book => book.id !== id));
  };

  const handleEditBook = (id: string) => {
    const bookToEdit = books.find(book => book.id === id);
    if (bookToEdit) {
      setEditingBook(bookToEdit);
      setIsAddModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setEditingBook(undefined);
  };

  const filterBooksByStatus = (status: BookStatus) => {
    return books.filter(book => book.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              {/* <BookOpen className="w-8 h-8 text-blue-500" /> */}
              <img src={Icon} alt="Logo" className='h-8'/>
              <h1 className="text-2xl font-bold">Readventure</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Add Book</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {(['to-read', 'reading', 'finished'] as const).map((status) => (
            <section key={status}>
              <h2 className="text-xl font-bold mb-4 capitalize">
                {status === 'to-read' ? 'To Read' : 
                 status === 'reading' ? 'Currently Reading' : 
                 'Finished'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filterBooksByStatus(status).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEditBook}
                    onDelete={handleDeleteBook}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <AddBookModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModal}
        onAdd={handleAddBook}
        onUpdate={handleUpdateBook}
        editBook={editingBook}
      />
    </div>
  );
}

export default App;