import axiosInstance from '../lib/axios';
import { toast } from 'react-toastify';

export const getNotes = async () => {
  try {
    const response = await axiosInstance.get('/notes');
    return response.data;
  } catch (error) {
    toast.error('Error fetching notes');
    throw error;
  }
};

export const getArchivedNotes = async () => {
  try {
    const response = await axiosInstance.get('/notes/archived');
    return response.data;
  } catch (error) {
    toast.error('Error fetching archived notes');
    throw error;
  }
};

export const createNote = async (note) => {
  try {
    const response = await axiosInstance.post('/notes', note);
    toast.success('Note created successfully');
    return response.data;
  } catch (error) {
    toast.error('Error creating note');
    throw error;
  }
};

export const updateNote = async (id, note) => {
  try {
    const response = await axiosInstance.put(`/notes/${id}`, note);
    toast.success('Note updated successfully');
    return response.data;
  } catch (error) {
    toast.error('Error updating note');
    throw error;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axiosInstance.delete(`/notes/${id}`);
    toast.success('Note deleted successfully');
    return response.data;
  } catch (error) {
    toast.error('Error deleting note');
    throw error;
  }
};

export const archiveNote = async (id) => {
  try {
    const response = await axiosInstance.patch(`/notes/${id}/archive`);
    toast.success('Note archived successfully');
    return response.data;
  } catch (error) {
    toast.error('Error archiving note');
    throw error;
  }
};

export const unarchiveNote = async (id) => {
  try {
    const response = await axiosInstance.patch(`/notes/${id}/unarchive`);
    toast.success('Note unarchived successfully');
    return response.data;
  } catch (error) {
    toast.error('Error unarchiving note');
    throw error;
  }
};
