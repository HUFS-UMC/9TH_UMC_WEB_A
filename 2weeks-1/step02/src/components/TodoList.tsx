import type { Task } from "../types";
import TodoItem from "./TodoItem";

interface Props {
  title: string;
  listId: string;
  tasks: Task[];
  variant: "todo" | "done";
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({
  title,
  listId,
  tasks,
  variant,
  onComplete,
  onDelete,
}: Props) {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id={listId} className="render-container__list">
        {tasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            variant={variant}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
