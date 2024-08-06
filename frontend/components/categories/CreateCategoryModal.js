import { useState, useEffect } from 'react';
import { categorySchema } from '../../utils/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const CreateCategoryModal = ({ isOpen, onClose, onSave, existingCategory }) => {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(categorySchema)
  });

  const colors = [
    { name: 'Red', className: 'bg-red-200' },
    { name: 'Green', className: 'bg-green-200' },
    { name: 'Blue', className: 'bg-blue-200' },
    { name: 'Yellow', className: 'bg-yellow-200' },
    { name: 'Purple', className: 'bg-purple-200' },
    { name: 'Orange', className: 'bg-orange-200' },
    { name: 'Pink', className: 'bg-pink-200' },
    { name: 'Teal', className: 'bg-teal-200' },
    { name: 'Gray', className: 'bg-gray-200' },
    { name: 'Indigo', className: 'bg-indigo-200' }
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (existingCategory) {
        setValue('name', existingCategory.name);
        setValue('color', existingCategory.color);
      } else {
        reset();
      }
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen, existingCategory, reset, setValue]);

  const handleSave = (data) => {
    const category = { ...data, id: existingCategory?.id };
    onSave(category, existingCategory ? existingCategory.name : null);
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
          <h2 className="text-2xl font-bold mb-4">{existingCategory ? 'Edit Category' : 'Create Category'}</h2>
          <form onSubmit={handleSubmit(handleSave)}>
            <input
              type="text"
              placeholder="Category Name"
              {...register('name')}
              className={`w-full p-2 border ${errors.name ? 'border-red-500 mb-0' : 'border-gray-300'} rounded mb-4`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            <label className="block text-gray-700 mb-2">Category Color</label>
            <select
              {...register('color')}
              className={`w-full p-2 border ${errors.color ? 'border-red-500 mb-0' : 'border-gray-300'} rounded mb-4`}
            >
              <option value="">Select a color</option>
              {colors.map((colorOption) => (
                <option key={colorOption.className} value={colorOption.className}>
                  {colorOption.name}
                </option>
              ))}
            </select>
            {errors.color && <p className="text-red-500 text-sm">{errors.color.message}</p>}
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryModal;
