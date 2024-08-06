'use client';

import { useState, useEffect } from 'react';
import CreateNotesModal from './CreateNotesModal';
import ListNotesComponent from './ListNotesComponent';
import NoteDetailsModal from './NoteDetailsModal';
import { getNotes, createNote, updateNote, deleteNote, archiveNote, unarchiveNote } from '../../services/noteService';
import { getCategories } from '../../services/categoryService';
import { useAuth } from '../../lib/auth';

const Notes = () => {
  useAuth();

  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [notes]);

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data.filter(note => !note.isArchived));
      setArchivedNotes(data.filter(note => note.isArchived));
    } catch (error) {
      console.error('Error fetching notes', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setAvailableCategories(data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };

  const addNote = async (newNote) => {
    try {
      const createdNote = await createNote(newNote);
      setNotes([...notes, createdNote]);
    } catch (error) {
      console.error('Error creating note', error);
    }
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsDetailsModalOpen(true);
  };

  const saveNote = async (updatedNote) => {
    try {
      const savedNote = await updateNote(updatedNote.id, updatedNote);
      setNotes(notes.map(note => (note.id === savedNote.id ? savedNote : note)));
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const handleArchiveNote = async (id) => {
    try {
      await archiveNote(id);
      setNotes(notes.filter(note => note.id !== id));
      setArchivedNotes([...archivedNotes, notes.find(note => note.id === id)]);
    } catch (error) {
      console.error('Error archiving note', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">My Notes</h1>
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="p-2 bg-blue-500 text-white rounded mb-4 md:mb-0 hover:bg-blue-600 transition"
          >
            Add Note
          </button>
          <input
            type="text"
            placeholder="Search notes by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border border-gray-300 rounded w-full md:w-1/2 shadow-md"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border max-md:mt-5 border-gray-300 rounded w-full md:w-auto shadow-md"
          >
            <option value="All">All Categories</option>
            {availableCategories.map((category, index) => (
              <option key={index} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <ListNotesComponent
          notes={notes}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onNoteClick={handleNoteClick}
        />
        <CreateNotesModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          addNote={addNote}
          availableCategories={availableCategories}
        />
        <NoteDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          note={selectedNote}
          onSave={saveNote}
          onArchive={handleArchiveNote}
          onDelete={handleDeleteNote}
          availableCategories={availableCategories}
        />
      </div>
    </div>
  );
};

export default Notes;
