import { TodoProvider } from "./context/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

export default function App() {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">YONG TODO</h1>

      <TodoProvider>
        <TodoInput />
        <div className="render-container">
          <TodoList title="할 일"   listId="todo-list"  variant="todo" />
          <TodoList title="완료"    listId="done-list"  variant="done" />
        </div>
        <TodoStats />
      </TodoProvider>
    </div>
  );
}
