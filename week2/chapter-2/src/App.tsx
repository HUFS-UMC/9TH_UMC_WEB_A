import './App.css'
import { useState } from 'react';

type Todo = {
  id: number;
  text: string;
};

const TodoApp = () => {
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [dones, setDones] = useState<Todo[]>([]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input }]);
    setInput("");
  };

  const completeTask = (task: Todo) => {
    setTodos(todos.filter(t => t.id !== task.id));
    setDones([...dones, task]);
  };

  const deleteTask = (task: Todo) => {
    setDones(dones.filter(t => t.id !== task.id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <form onSubmit={addTodo} className="todo-container__form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="todo-container__input"
          placeholder="할 일 입력"
        />
        <button type="submit" className="todo-container__button">할 일 추가</button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul className="render-container__list">
            {todos.map(task => (
              <li key={task.id} className="render-container__item">
                {task.text}
                <button
                  onClick={() => completeTask(task)}
                  className="render-container__item-button"
                  style={{ backgroundColor: "#28a745" }}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul className="render-container__list">
            {dones.map(task => (
              <li key={task.id} className="render-container__item">
                {task.text}
                <button
                  onClick={() => deleteTask(task)}
                  className="render-container__item-button"
                  style={{ backgroundColor: "#dc3545" }}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
