import { useForm } from "react-hook-form";
import type { Task, TaskStatus } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";

interface TaskFormInputs {
  title: string;
  description: string;
  status: TaskStatus;
  assignedUser: string;
  dueDate: string;
}

export default function TaskForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<TaskFormInputs>();
  const { setTasks } = useTaskContext();

  const onSubmit = (data: TaskFormInputs) => {
    const newTask: Task = {
      id: uuidv4(),
      ...data
    };
    setTasks((prev) => [...prev, newTask]);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded-lg">
      <input placeholder="Title" {...register("title", { required: true })} className="w-full p-2 border rounded" />
      {errors.title && <span className="text-red-500 text-sm">Title is required</span>}

      <textarea placeholder="Description" {...register("description")} className="w-full p-2 border rounded" />

      <select {...register("status")} className="w-full p-2 border rounded">
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>

      <input placeholder="Assigned User" {...register("assignedUser", { required: true })} className="w-full p-2 border rounded" />
      {errors.assignedUser && <span className="text-red-500 text-sm">Assigned user is required</span>}

      <input type="date" {...register("dueDate", { required: true })} className="w-full p-2 border rounded" />
      {errors.dueDate && <span className="text-red-500 text-sm">Due date is required</span>}

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Add Task</button>
    </form>
  );
}