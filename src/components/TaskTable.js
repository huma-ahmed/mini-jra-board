import React from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody, Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TaskTable({ tasks, onDelete, currentUser }) {
  const navigate = useNavigate();

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
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => navigate(`/view-task/${task.id}`)}
              >
                View
              </Button>
              {task.reporter === currentUser && (
                <>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/edit-task/${task.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={() => onDelete(task.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}