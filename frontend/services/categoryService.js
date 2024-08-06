import axiosInstance from '../lib/axios';
import { toast } from 'react-toastify';

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get('/categories');
    return response.data;
  } catch (error) {
    toast.error('Error fetching categories');
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await axiosInstance.post('/categories', category);
    toast.success('Category created successfully');
    return response.data;
  } catch (error) {
    toast.error('Error creating category');
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await axiosInstance.put(`/categories/${id}`, category);
    toast.success('Category updated successfully');
    return response.data;
  } catch (error) {
    toast.error('Error updating category');
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`/categories/${id}`);
    toast.success('Category deleted successfully');
    return response.data;
  } catch (error) {
    toast.error('Error deleting category');
    throw error;
  }
};
