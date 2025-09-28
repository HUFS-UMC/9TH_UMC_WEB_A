/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useContext, type ReactNode, type FormEvent } from 'react';

// Task 타입 정의
type Task = {
  id: number;
  text: string;
};

// 컨텍스트에 담을 데이터의 타입 정의
interface TodoContextType {
  todos: Task[];
  doneTasks: Task[];
  todoInput: string;
  setTodoInput: (value: string) => void;
  handleFormSubmit: (event: FormEvent) => void;
  handleCompleteTask: (task: Task) => void;
  handleDeleteTask: (task: Task) => void;
}

// 컨텍스트 생성 (초기값은 null로 설정)
const TodoContext = createContext<TodoContextType | null>(null);

// TodoProvider 컴포넌트 정의
export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);
  const [todoInput, setTodoInput] = useState<string>('');

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();
    const text = todoInput.trim();
    if (text) {
      setTodos((prev) => [...prev, { id: Date.now(), text }]);
      setTodoInput('');
    }
  };

  const handleCompleteTask = (task: Task) => {
    setTodos(todos.filter((t) => t.id !== task.id));
    setDoneTasks([...doneTasks, task]);
  };

  const handleDeleteTask = (task: Task) => {
    setDoneTasks(doneTasks.filter((t) => t.id !== task.id));
  };

  const value = {
    todos,
    doneTasks,
    todoInput,
    setTodoInput,
    handleFormSubmit,
    handleCompleteTask,
    handleDeleteTask,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

// 컨텍스트를 쉽게 사용하기 위한 커스텀 훅
export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext는 TodoProvider 내부에서 사용되어야 합니다.');
  }
  return context;
};