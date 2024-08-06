import { useEffect, useState } from 'react';
import { noteSchema } from '@/utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreateNotesModal = ({ isOpen, onClose, addNote, availableCategories }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(noteSchema)
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      reset();
      setCategories([]);
    }
  }, [isOpen, reset]);

  const handleCategoryChange = (category) => {
    if (categories.some(c => c.id === category.id)) {
      setCategories(categories.filter(c => c.id !== category.id));
    } else {
      setCategories([...categories, category]);
    }
  };

  const filteredCategories = availableCategories.filter(category => category.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const onSubmit = (data) => {
    const noteData = {
      ...data,
      categories: categories.map(category => category.id)
    };

    addNote(noteData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div className="fixed inset-0 w-full h-full bg-black opacity-50" onClick={onClose}></div>
      <div className="flex items-center min-h-screen px-4 py-8">
        <div className="relative w-full max-w-lg p-8 mx-auto bg-white rounded-md shadow-lg">
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ×
          </button>
          <h2 className="text-2xl font-bold mb-4">Add a new note</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Title"
              {...register('title')}
              className={`w-full p-2 border ${errors.title ? 'border-red-500 mb-0' : 'border-gray-300'} rounded mb-4`}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            <textarea
              placeholder="Description"
              {...register('description')}
              className={`w-full p-2 border ${errors.description ? 'border-red-500 mb-0' : 'border-gray-300'} rounded mb-4 h-40`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Categories</label>
              <input
                type="text"
                placeholder="Search categories"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
              <div className="max-h-40 overflow-y-auto">
                {filteredCategories.map((category, index) => (
                  <label key={index} className="block mb-2">
                    <input
                      type="checkbox"
                      checked={categories.some(c => c.id === category.id)}
                      onChange={() => handleCategoryChange(category)}
                      className="mr-2"
                    />
                    <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 border border-black ${category.color}`}>
                      {category.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Save Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateNotesModal;
