import type { Todos } from '@/db/types';

import { TodoItem } from '../TodoItem';

type TodoListProps = {
  todos: Todos;
  onToggleComplete: (id: string) => void;
};

export const TodoList = ({ todos, onToggleComplete }: TodoListProps) => {
  return (
    <div className="mt-8 flex flex-col gap-4">
      {todos.map((todo) => (
        <TodoItem
          description={todo.description}
          id={todo._id.toString()}
          isCompleted={todo.completed}
          key={todo._id.toString()}
          title={todo.title}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </div>
  );
};
