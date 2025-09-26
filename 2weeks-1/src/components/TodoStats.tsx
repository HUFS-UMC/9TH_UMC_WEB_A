import { useTodos } from "../context/TodoContext";

export default function TodoStats() {
  const { tasks } = useTodos();
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const remaining = total - done;

  return (
    <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
      남은 할 일: <b>{remaining}</b>개 / 전체 <b>{total}</b>개
    </div>
  );
}
