import type { Task } from "../types/task";

const STORAGE_KEY = "tasks";

export function loadTasks(): Task[] {
  const data = localStorage.getItem(STORAGE_KEY);
  console.log(data,"d")
  return data ? JSON.parse(data) : [];
}

export function saveTasks(tasks: Task[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}