

import React, { useState, useEffect } from "react";

export default function NoteApp() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (activeNote !== null) {
      setTitle(notes[activeNote].title);
      setContent(notes[activeNote].content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [activeNote]);

  // নতুন নোট যুক্ত করুন
  const handleCreateNote = () => {
    const newNote = { title: "Untitled", content: "" };
    setNotes([newNote, ...notes]);
    setActiveNote(0);
  };

  // নোট সেভ (অটো)
  const handleAutoSave = () => {
    if (activeNote !== null) {
      const updatedNotes = [...notes];
      updatedNotes[activeNote] = { title, content };
      setNotes(updatedNotes);
    }
  };

  // নোট ডিলিট
  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    setActiveNote(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="col-span-1 bg-white rounded-2xl shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">My Notes</h2>
            <button
              onClick={handleCreateNote}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow"
            >
              + Add
            </button>
          </div>
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li
                key={index}
                onClick={() => setActiveNote(index)}
                className={`cursor-pointer px-3 py-2 rounded-lg ${
                  activeNote === index
                    ? "bg-blue-100 text-blue-900"
                    : "hover:bg-gray-200"
                }`}
              >
                {note.title || "Untitled"}
              </li>
            ))}
          </ul>
        </div>

        {/* Editor */}
        <div className="col-span-2 bg-white rounded-2xl shadow p-6">
          {activeNote !== null ? (
            <div>
              <input
                className="w-full text-2xl font-bold border-none focus:outline-none mb-3"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  handleAutoSave();
                }}
                placeholder="Title"
              />
              <textarea
                className="w-full h-[400px] resize-none border border-gray-300 p-4 rounded focus:outline-blue-400"
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                  handleAutoSave();
                }}
                placeholder="Start writing your note..."
              ></textarea>
              <div className="mt-4 text-right">
                <button
                  onClick={() => handleDeleteNote(activeNote)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-20">Select or create a note to begin editing.</p>
          )}
        </div>
      </div>
    </div>
  );
}

