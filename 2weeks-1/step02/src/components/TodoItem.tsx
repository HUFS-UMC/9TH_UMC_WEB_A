import type { Task } from "../types";

interface Props {
  task: Task;
  variant: "todo" | "done";
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TodoItem({ task, variant, onComplete, onDelete }: Props) {
  const isTodo = variant === "todo";
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      {isTodo ? (
        <button
          className="render-container__item-button"
          style={{ backgroundColor: "#28a745" }}
          onClick={() => onComplete(task.id)}
        >
          완료
        </button>
      ) : (
        <button
          className="render-container__item-button"
          onClick={() => onDelete(task.id)}
        >
          삭제
        </button>
      )}
    </li>
  );
}
