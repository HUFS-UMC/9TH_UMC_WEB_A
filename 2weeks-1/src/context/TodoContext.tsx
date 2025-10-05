import { createContext, useContext, useState, type PropsWithChildren } from "react";

export type Task = { id: number; text: string; done: boolean };

type TodoCtx = {
  tasks: Task[];
  add: (text: string) => void;
  complete: (id: number) => void;
  remove: (id: number) => void;
};

const Ctx = createContext<TodoCtx | undefined>(undefined);

export function TodoProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>([]);

  const add = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setTasks(prev => [...prev, { id: Date.now(), text: t, done: false }]);
  };
  const complete = (id: number) => {
    setTasks(prev => prev.map(it => (it.id === id ? { ...it, done: true } : it)));
  };
  const remove = (id: number) => setTasks(prev => prev.filter(it => it.id !== id));

  return <Ctx.Provider value={{ tasks, add, complete, remove }}>{children}</Ctx.Provider>;
}

export function useTodos() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTodos must be used within <TodoProvider>");
  return ctx;
}
