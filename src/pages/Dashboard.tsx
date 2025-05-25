import { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import FilterBar from "../components/FilterBar";

export default function Dashboard() {
  const { tasks } = useTaskContext();
  const [statusFilter, setStatusFilter] = useState("");
  const [dueFilter, setDueFilter] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter ? task.status === statusFilter : true;
    const dueMatch = dueFilter ? new Date(task.dueDate) >= new Date(dueFilter) : true;
    return statusMatch && dueMatch;
  });

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Task Dashboard</h1>
      <FilterBar status={statusFilter} setStatus={setStatusFilter} due={dueFilter} setDue={setDueFilter} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
      <h2 className="text-xl font-semibold mb-2">Add New Task</h2>
      <TaskForm />
    </div>
  );
}