import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import axios from 'axios';

export default function NoteEditor({ note }) {
  const { data, setData, put } = useForm({
    title: note.title,
    content: note.content,
  });

  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    put(route('notes.update', note.id));
  };

  const handleSummarize = async () => {
    setLoading(true);
    setSummary('');
    try {
      const res = await axios.post(route('ai.summarize'), {
        content: data.content,
      });
      setSummary(res.data.summary);
    } catch (err) {
      setSummary('Error while summarizing');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Note</h2>

      <input
        type="text"
        className="w-full p-2 border mb-4"
        placeholder="Note Title"
        value={data.title}
        onChange={(e) => setData('title', e.target.value)}
      />

      <textarea
        className="w-full h-48 p-2 border mb-4"
        placeholder="Write your note..."
        value={data.content}
        onChange={(e) => setData('content', e.target.value)}
      />

      <div className="flex items-center gap-4 mb-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleSummarize}
        >
          Summarize with AI
        </button>
      </div>

      {loading && <p className="text-gray-600">Generating summary...</p>}

      {summary && (
        <div className="mt-4 p-4 border bg-gray-100">
          <strong>AI Summary:</strong>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
}
