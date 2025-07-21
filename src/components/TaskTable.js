import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';

export default function TaskTable({ tasks, onDelete }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Task Name</TableCell>
          <TableCell>Reporter</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(task => (
          <TableRow key={task.id}>
            <TableCell>{task.name}</TableCell>
            <TableCell>{task.reporter}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>
              <Button size="small">View</Button>
              <Button size="small">Edit</Button>
              <Button size="small" color="error" onClick={() => onDelete(task.id)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
