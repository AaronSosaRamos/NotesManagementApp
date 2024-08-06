const ListArchivedNotesComponent = ({ notes, searchTerm, selectedCategory, onNoteClick }) => {
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === 'All' || note.categories.some(category => category.name === selectedCategory))
  );

  return (
    <ul className="space-y-4">
      {filteredNotes.map((note, noteIndex) => (
        <li
          key={noteIndex}
          className="p-4 border border-gray-300 rounded cursor-pointer hover:shadow-lg transition-shadow duration-200 bg-white"
          onClick={() => onNoteClick(note)}
        >
          <h3 className="text-xl font-bold truncate">{note.title}</h3>
          <p className="text-gray-700 truncate">{note.description}</p>
          <small className="text-gray-500 block">{new Date(note.created_at).toLocaleString()}</small>
          <div className="mt-2 flex flex-wrap">
            {note.categories.map((category, categoryIndex) => (
              <span
                key={categoryIndex}
                className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 border border-black ${category.color}`}
              >
                {category.name}
              </span>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ListArchivedNotesComponent;
