// src/pages/Dashboard.tsx
import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import FilterBar from "../components/FilterBar";
import TaskTable from "../components/TaskTable";
import TaskDialog from "../components/TaskDialog";
import type { Task } from "../types/task";

export default function Dashboard() {
  const { tasks, setTasks } = useTaskContext();
  const [statusFilter, setStatusFilter] = useState("");
  const [dueFilter, setDueFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = statusFilter ? task.status === statusFilter : true;
    const matchesDue =
      dueFilter === "before"
        ? task.dueDate < today
        : dueFilter === "after"
        ? task.dueDate > today
        : true;
    return matchesStatus && matchesDue;
  });

    const handleEditTask = (task: Task) => {
    setSelectedTask(task);
    setOpenDialog(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
          Task Dashboard
          <Button variant="contained" onClick={() => setOpenDialog(true)} sx={{ mb: 2 }}>
            Add Task
          </Button>
        </div>
       
      </Typography>

      <FilterBar
        status={statusFilter}
        setStatus={setStatusFilter}
        due={dueFilter}
        setDue={setDueFilter}
      />

      <TaskTable tasks={filteredTasks} onEdit={handleEditTask} onDelete={handleDeleteTask} />

      <TaskDialog open={openDialog} onClose={() => setOpenDialog(false)} initialData={selectedTask} />
    </Container>
  );
}
