import React, { useState, useEffect } from 'react';
import { Book, BookStatus } from '../types';
import { X } from 'lucide-react';

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (book: Omit<Book, 'id'>) => void;
  onUpdate?: (id: string, book: Partial<Book>) => void;
  editBook?: Book;
}

const initialFormData = {
  title: '',
  author: '',
  coverUrl: '',
  status: 'to-read' as BookStatus,
  progress: 0,
  totalPages: 0,
  tags: '',
};

export function AddBookModal({ isOpen, onClose, onAdd, onUpdate, editBook }: AddBookModalProps) {
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (editBook) {
      setFormData({
        ...editBook,
        tags: editBook.tags.join(', '),
      });
    } else {
      setFormData(initialFormData);
    }
  }, [editBook, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bookData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      notes: editBook?.notes || [],
    };

    if (editBook && onUpdate) {
      onUpdate(editBook.id, bookData);
    } else {
      onAdd(bookData);
    }
    
    onClose();
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">{editBook ? 'Edit Book' : 'Add New Book'}</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Cover URL</label>
            <input
              type="url"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={formData.coverUrl}
              onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Total Pages</label>
            <input
              type="number"
              required
              min="1"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={formData.totalPages}
              onChange={(e) => setFormData({ ...formData, totalPages: Number(e.target.value) })}
            />
          </div>

          {(formData.status === 'reading' || editBook?.status === 'reading') && (
            <div>
              <label className="block text-sm font-medium mb-1">Pages Read</label>
              <input
                type="number"
                min="0"
                max={formData.totalPages}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: Math.min(Number(e.target.value), formData.totalPages) })}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.totalPages - formData.progress} pages remaining
              </p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="fiction, mystery, thriller"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as BookStatus })}
            >
              <option value="to-read">To Read</option>
              <option value="reading">Currently Reading</option>
              <option value="finished">Finished</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {editBook ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}