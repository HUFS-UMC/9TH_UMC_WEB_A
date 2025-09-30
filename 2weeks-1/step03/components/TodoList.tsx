import { useTodos } from "../context/TodoContext";
import TodoItem from "./TodoItem";

interface Props { title: string; listId: string; variant: "todo" | "done"; }

export default function TodoList({ title, listId, variant }: Props) {
  const { tasks } = useTodos();
  const items = tasks.filter(t => (variant === "done" ? t.done : !t.done));

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul id={listId} className="render-container__list">
        {items.map(t => (
          <TodoItem key={t.id} taskId={t.id} text={t.text} variant={variant} />
        ))}
      </ul>
    </div>
  );
}
