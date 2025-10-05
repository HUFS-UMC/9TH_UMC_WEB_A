import { useState, type FormEvent } from "react";
import { useTodos } from "../context/TodoContext";

export default function TodoInput() {
  const [input, setInput] = useState("");
  const { add } = useTodos();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    add(input);
    setInput("");
  };

  return (
    <form id="todo-form" className="todo-container__form" onSubmit={onSubmit}>
      <input
        id="todo-input" className="todo-container__input"
        placeholder="할 일 입력" required
        value={input} onChange={e => setInput(e.target.value)}
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  );
}
