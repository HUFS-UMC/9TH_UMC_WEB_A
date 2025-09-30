import type { FormEvent } from "react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: (e: FormEvent) => void;
}

export default function TodoInput({ value, onChange, onSubmit }: Props) {
  return (
    <form id="todo-form" className="todo-container__form" onSubmit={onSubmit}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        required
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
}
