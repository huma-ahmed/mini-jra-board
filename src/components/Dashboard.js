import React from 'react';
import {
  Box, Button, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const tasks = [
  { id: 1, name: 'Fix login bug', reporter: 'Ali', status: 'To-do' },
  { id: 2, name: 'UI enhancements', reporter: 'Sara', status: 'In Progress' },
  { id: 3, name: 'Database backup', reporter: 'Ahmed', status: 'Blocked' },
  { id: 4, name: 'Deploy to server', reporter: 'Fatima', status: 'Completed' },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Welcome Dummy</Typography>
        <Button variant="outlined" color="secondary" onClick={() => navigate('/')}>Log Out</Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Tasks</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/create-task')}>Create Task</Button>
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: '#f0f0f0' }}>
            <TableRow>
              <TableCell><strong>Task Name</strong></TableCell>
              <TableCell><strong>Reporter</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Action</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.reporter}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button size="small" variant="text" color="primary">View</Button>
                  <Button size="small" variant="text" color="warning">Edit</Button>
                  <Button size="small" variant="text" color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}