import {
  Button,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import type { Task, TaskStatus } from "../types/task";
import { useTaskContext } from "../context/TaskContext";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { Controller } from "react-hook-form";

interface TaskFormInputs {
  title: string;
  description: string;
  status: TaskStatus;
  assignedUser: string;
  dueDate: string;
}

interface Props {
  initialData?: Task | null;
  onSubmit: () => void;
}

export default function TaskForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<TaskFormInputs>({});

  useEffect(() => {
    if (initialData) {

      reset(initialData);
    } else {
      reset({
        title: "",
        description: "",
        status: "To Do",
        assignedUser: "",
        dueDate: "",
      });
    }
  }, [initialData, reset]);

  const { setTasks } = useTaskContext();

  const handleFormSubmit = (data: TaskFormInputs) => {
    const newTask: Task = {
      id: initialData?.id ?? uuidv4(),
      ...data,
    };

    setTasks((prev) =>
      initialData
        ? prev.map((task) => (task.id === initialData.id ? newTask : task))
        : [...prev, newTask]
    );

    reset();
    onSubmit();
  };

  console.log(initialData, "initialData")

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Typography variant="h6" gutterBottom>
        {initialData ? "Edit Task" : "Add New Task"}
      </Typography>

      <TextField
        label="Title"
        fullWidth
        {...register("title", { required: true })}
        error={!!errors.title}
        helperText={errors.title && "Title is required"}
        style={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Description"
        fullWidth
        multiline
        rows={3}
        {...register("description")}
        style={{ marginBottom: '1rem' }}
      />

      <Controller
        name="status"
        control={control}
        defaultValue="To Do"
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            {...field}
            select
            label="Status"
            fullWidth
            error={!!errors.status}
            helperText={errors.status && "Status is required"}
            style={{ marginBottom: '1rem' }}
          >
            <MenuItem value="To Do">To Do</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>
        )}
      />

      <TextField
        label="Assigned User"
        fullWidth
        {...register("assignedUser", { required: true })}
        error={!!errors.assignedUser}
        helperText={errors.assignedUser && "Assigned user is required"}
        style={{ marginBottom: '1rem' }}
      />

      <TextField
        label="Due Date"
        fullWidth
        type="date"
        {...register("dueDate", { required: true })}
        error={!!errors.dueDate}
        helperText={errors.dueDate && "Due date is required"}
        style={{ marginBottom: '1rem' }}
      />

      <Button type="submit" variant="contained" color="primary">
        {initialData ? "Update Task" : "Add Task"}
      </Button>
    </form>
  );
}
