'use client';

import { useState, useEffect } from 'react';
import CategoryListComponent from './CategoryListComponent';
import CreateCategoryModal from './CreateCategoryModal';
import { getCategories, createCategory, updateCategory, deleteCategory } from '../../services/categoryService';
import { useAuth } from '../../lib/auth';

const Categories = () => {
  useAuth();

  const [categories, setCategories] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [existingCategory, setExistingCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const handleCreateCategory = async (category) => {
    try {
      const newCategory = await createCategory(category);
      setCategories([...categories, newCategory]);
    } catch (error) {
      console.error('Error creating category', error);
    }
  };
  
  const handleEditCategory = async (category, originalName) => {
    try {
      const updatedCategory = await updateCategory(category.id, category);
      setCategories(categories.map(cat => cat.id === category.id ? updatedCategory : cat));
    } catch (error) {
      console.error('Error updating category', error);
    }
  };
  

  const handleDeleteCategory = async (id) => {
    try {
      await deleteCategory(id);
      setCategories(categories.filter(cat => cat.id !== id));
    } catch (error) {
      console.error('Error deleting category', error);
    }
  };

  const handleSaveCategory = async (category, originalName) => {
    if (originalName) {
      await handleEditCategory(category, originalName);
    } else {
      await handleCreateCategory(category);
    }
    setIsCreateModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Manage Categories</h1>
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
          <button
            onClick={() => { setIsCreateModalOpen(true); setExistingCategory(null); }}
            className="p-2 bg-blue-500 text-white rounded mb-4 md:mb-0 hover:bg-blue-600 transition"
          >
            Add Category
          </button>
          <input
            type="text"
            placeholder="Search categories"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-auto shadow-md"
          />
        </div>
        <CategoryListComponent
          categories={categories}
          searchTerm={searchTerm}
          onEdit={(category) => { setIsCreateModalOpen(true); setExistingCategory(category); }}
          onDelete={(category) => handleDeleteCategory(category.id)}
        />
        <CreateCategoryModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSave={handleSaveCategory}
          existingCategory={existingCategory}
        />
      </div>
    </div>
  );
};

export default Categories;
