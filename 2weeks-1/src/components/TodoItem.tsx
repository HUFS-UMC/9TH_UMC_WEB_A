import { useTodos } from "../context/TodoContext";

interface Props { taskId: number; text: string; variant: "todo" | "done"; }

export default function TodoItem({ taskId, text, variant }: Props) {
  const { complete, remove } = useTodos();
  const isTodo = variant === "todo";

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{text}</span>
      {isTodo ? (
        <button className="render-container__item-button"
          style={{ backgroundColor: "#28a745" }}
          onClick={() => complete(taskId)}>
          완료
        </button>
      ) : (
        <button className="render-container__item-button" onClick={() => remove(taskId)}>
          삭제
        </button>
      )}
    </li>
  );
}
