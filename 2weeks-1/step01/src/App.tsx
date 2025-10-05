import { useState, type FormEvent } from "react";

type Task = {
  id: number;
  text: string;
  done: boolean; // false: 할 일, true: 완료
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks(prev => [...prev, { id: Date.now(), text, done: false }]);
    setInput("");
  };

  const completeTask = (id: number) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, done: true } : t)));
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const todoList = tasks.filter(t => !t.done);
  const doneList = tasks.filter(t => t.done);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <form id="todo-form" className="todo-container__form" onSubmit={addTodo}>
        <input
          type="text"
          id="todo-input"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>

      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            {todoList.map(task => (
              <li key={task.id} className="render-container__item">
                <span className="render-container__item-text">{task.text}</span>
                <button
                  className="render-container__item-button"
                  style={{ backgroundColor: "#28a745" }}
                  onClick={() => completeTask(task.id)}
                >
                  완료
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="done-list" className="render-container__list">
            {doneList.map(task => (
              <li key={task.id} className="render-container__item">
                <span className="render-container__item-text">{task.text}</span>
                <button
                  className="render-container__item-button"
                  onClick={() => deleteTask(task.id)}
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
}
