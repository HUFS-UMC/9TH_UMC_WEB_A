import { useTodoContext } from '../context/TodoContext';

const DoneList = () => {
  const { doneTasks, handleDeleteTask } = useTodoContext();

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">완료</h2>
      <ul id="done-list" className="render-container__list">
        {doneTasks.map((task) => (
          <li key={task.id} className="render-container__item">
            <span className="render-container__item-text">{task.text}</span>
            <button
              className="render-container__item-button"
              style={{ backgroundColor: '#dc3545' }}
              onClick={() => handleDeleteTask(task)}
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DoneList;