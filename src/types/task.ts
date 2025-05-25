export type TaskStatus = "To Do" | "In Progress" | "Done";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  assignedUser: string;
  dueDate: string; // ISO date string
}