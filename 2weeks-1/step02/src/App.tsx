import { useState, type FormEvent } from "react";
import type { Task } from "./types";
import TodoInput from "./components/TodoInput.tsx";
import TodoList from "./components/TodoList.tsx";
import TodoStats from "./components/TodoStats.tsx";


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

      <TodoInput value={input} onChange={setInput} onSubmit={addTodo} />

      <div className="render-container">
        <TodoList
          title="할 일"
          listId="todo-list"
          tasks={todoList}
          onComplete={completeTask}
          onDelete={deleteTask}
          variant="todo"
        />
        <TodoList
          title="완료"
          listId="done-list"
          tasks={doneList}
          onComplete={completeTask}
          onDelete={deleteTask}
          variant="done"
        />
      </div>

      <TodoStats total={tasks.length} done={doneList.length} />
    </div>
  );
}
