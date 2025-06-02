'use client';

import { trpc } from '@/trpc/client/client';

import { TodoCreate, TodoList } from './_components';

export default function Page() {
  const utils = trpc.useUtils();
  const { data: todos, isLoading } = trpc.todo.list.useQuery();

  const addTodo = trpc.todo.add.useMutation({
    onSuccess: () => {
      void utils.todo.list.invalidate();
    },
  });

  const toggleTodo = trpc.todo.toggle.useMutation({
    onSuccess: () => {
      void utils.todo.list.invalidate();
    },
  });

  const handleAddTodo = (title: string, description: string) => {
    addTodo.mutate({ title, description });
  };

  const handleToggleComplete = (id: string) => {
    toggleTodo.mutate({ id });
  };

  return (
    <div className="w-full max-w-xl">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <TodoCreate onSubmit={handleAddTodo} />
      {isLoading ? (
        <p className="mt-4 text-gray-500">Loading todos...</p>
      ) : (
        <TodoList todos={todos ?? []} onToggleComplete={handleToggleComplete} />
      )}
    </div>
  );
}
