import { useState } from 'react';

type TodoCreateProps = {
  onSubmit: (title: string, description: string) => void;
};

export const TodoCreate = ({ onSubmit }: TodoCreateProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        className="rounded-md border border-gray-300 p-2"
        placeholder="Enter task title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="rounded-md border border-gray-300 p-2"
        placeholder="Enter task description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="cursor-pointer rounded-md bg-blue-500 px-4 py-2 text-white enabled:hover:bg-blue-600 disabled:cursor-default disabled:opacity-70"
        disabled={!title.trim() || !description.trim()}
        type="submit"
      >
        Add Todo
      </button>
    </form>
  );
};
