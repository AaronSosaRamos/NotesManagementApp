import { useState, useEffect } from 'react';
import ListArchivedNotesComponent from './ListArchivedNotesComponent';
import ArchivedNoteDetailsModal from './ArchivedNoteDetailsModal';
import { getCategories } from '../../services/categoryService';
import { getArchivedNotes, unarchiveNote, deleteNote, updateNote } from '../../services/noteService';

const ArchivedNotes = () => {
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchArchivedNotes();
    fetchCategories();
  }, [archivedNotes]);

  const fetchArchivedNotes = async () => {
    try {
      const data = await getArchivedNotes();
      setArchivedNotes(data);
    } catch (error) {
      console.error('Error fetching archived notes', error);
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

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsDetailsModalOpen(true);
  };

  const saveNote = async (updatedNote) => {
    try {
      await updateNote(updatedNote.id, updatedNote);
      setArchivedNotes(archivedNotes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
    } catch (error) {
      console.error('Error updating note', error);
    }
  };

  const handleUnarchiveNote = async (id) => {
    try {
      await unarchiveNote(id);
      setArchivedNotes(archivedNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error unarchiving note', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
      setArchivedNotes(archivedNotes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Archived Notes</h1>
        <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
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
        <ListArchivedNotesComponent
          notes={archivedNotes}
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          onNoteClick={handleNoteClick}
        />
        <ArchivedNoteDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          note={selectedNote}
          onSave={saveNote}
          onUnarchive={handleUnarchiveNote}
          onDelete={handleDeleteNote}
          availableCategories={availableCategories}
        />
      </div>
    </div>
  );
};

export default ArchivedNotes;
