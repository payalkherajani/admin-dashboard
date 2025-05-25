// src/components/FilterBar.tsx
import { TextField, MenuItem, Stack } from "@mui/material";

interface FilterBarProps {
  status: string;
  setStatus: (status: string) => void;
  due: string;
  setDue: (due: string) => void;
}

export default function FilterBar({ status, setStatus, due, setDue }: FilterBarProps) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2} mb={2}>
      <TextField
        label="Filter by Status"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="To Do">To Do</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Done">Done</MenuItem>
      </TextField>

      <TextField
        label="Due Date Filter"
        select
        value={due}
        onChange={(e) => setDue(e.target.value)}
        fullWidth
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="before">Due Before Today</MenuItem>
        <MenuItem value="after">Due After Today</MenuItem>
      </TextField>
    </Stack>
  );
}
