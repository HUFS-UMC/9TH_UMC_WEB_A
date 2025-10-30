import { useState, type FormEvent } from "react";
import { useTodo } from "../context/TodoContext";

const TodoForm = () => {
  const [input, setInput] = useState<string>("");
  const { addTodo } = useTodo();
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    //입력되는 값들을 받는 함수.
    e.preventDefault();
    const text = input.trim();

    if (text) {
      //add todo 자리
      addTodo(text);
      setInput(""); //값 입력 후 enter 눌렀을 때 기존에 입력된 값들이 사라짐.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        value={input}
        onChange={(e): void => setInput(e.target.value)}
        type="text"
        className="todo-container__input"
        placeholder="Type your task"
        required
      />
      <button type="submit" className="todo-container__button">
        할 일 추가
      </button>
    </form>
  );
};

export default TodoForm;
