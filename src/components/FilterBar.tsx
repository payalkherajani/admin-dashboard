interface Props {
  status: string;
  setStatus: (status: string) => void;
  due: string;
  setDue: (date: string) => void;
}

export default function FilterBar({ status, setStatus, due, setDue }: Props) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="p-2 border rounded">
        <option value="">All Status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <input
        type="date"
        value={due}
        onChange={(e) => setDue(e.target.value)}
        className="p-2 border rounded"
      />
    </div>
  );
}