import { useTodoContext } from '../context/TodoContext';

const TodoList = () => {
  const { todos, handleCompleteTask } = useTodoContext();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">할 일</h2>
      <ul id="todo-list" className="render-container__list">
        {todos.map((task) => (
          <li key={task.id} className="render-container__item">
            <span className="render-container__item-text">{task.text}</span>
            <button
              className="render-container__item-button complete-button"
              onClick={() => handleCompleteTask(task)}
            >
              완료
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;