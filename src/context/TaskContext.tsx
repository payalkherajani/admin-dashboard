// context/TaskContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Task } from "../types/task";
import { loadTasks, saveTasks } from "../utils/storage";

interface TaskContextType {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const [tasks, setTasks] = useState<Task[]>(() => loadTasks());

  useEffect(() => {
    setTasks(loadTasks());
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>{children}</TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTaskContext must be used within TaskProvider");
  return context;
};