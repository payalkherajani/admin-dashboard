import type { Task } from "../types/task";

export default function TaskCard({ task }: { task: Task }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p className="text-sm">{task.description}</p>
      <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
      <p className="text-xs text-gray-500">Assigned: {task.assignedUser}</p>
      <p className="text-xs text-blue-600">Status: {task.status}</p>
    </div>
  );
}
