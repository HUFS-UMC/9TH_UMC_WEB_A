import { useTodoContext } from '../context/TodoContext';

const TodoForm = () => {
  const { todoInput, setTodoInput, handleFormSubmit } = useTodoContext();

  return (
    <form id="todo-form" className="todo-container__form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        id="todo-input"
        className="todo-container__input"
        placeholder="할 일 입력"
        value={todoInput}
        onChange={(e) => setTodoInput(e.target.value)}
        required
      />
      <button type="submit" className="todo-container__button">할 일 추가</button>
    </form>
  );
};

export default TodoForm;