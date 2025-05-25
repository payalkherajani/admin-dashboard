// src/pages/Dashboard.tsx
import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useTaskContext } from "../context/TaskContext";
import FilterBar from "../components/FilterBar";
import TaskTable from "../components/TaskTable";
import TaskDialog from "../components/TaskDialog";

export default function Dashboard() {
  const { tasks } = useTaskContext();
  const [statusFilter, setStatusFilter] = useState("");
  const [dueFilter, setDueFilter] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

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

      <TaskTable tasks={filteredTasks} />

      <TaskDialog open={openDialog} onClose={() => setOpenDialog(false)} />
    </Container>
  );
}
