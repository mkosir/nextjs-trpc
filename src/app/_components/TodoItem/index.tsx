type TodoItemProps = {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  onToggleComplete: (id: string) => void;
};

export const TodoItem = ({ id, title, description, isCompleted, onToggleComplete }: TodoItemProps) => {
  return (
    <div
      className={`flex items-center gap-4 rounded-lg border p-4 ${
        isCompleted ? 'border-gray-200 bg-gray-50' : 'border-gray-200'
      }`}
    >
      <input
        checked={isCompleted}
        className="h-4 w-4 cursor-pointer rounded-sm border-gray-300 text-blue-500 focus:ring-blue-500"
        type="checkbox"
        onChange={() => onToggleComplete(id)}
      />
      <div className="flex flex-1 flex-col gap-1">
        <h3 className={`font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>{title}</h3>
        {<p className={`text-sm ${isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>}
      </div>
    </div>
  );
};
