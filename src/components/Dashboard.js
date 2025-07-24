<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import {
  Box, Button, Typography, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'GET',
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch tasks');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/logout', {
      method: 'GET',
      credentials: 'include'
    });
    navigate('/');
  };

  const extractField = (description, field) => {
    const lines = description.split('\n');
    const match = lines.find(line => line.startsWith(`${field}:`));
    return match ? match.replace(`${field}:`, '').trim() : '';
  };

  const getMainDescription = (description) => {
    const lines = description.split('\n');
    return lines[0]; // First line is main task description
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">Welcome Dummy</Typography>
        <Button variant="outlined" color="error" onClick={handleLogout}>Log Out</Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Tasks</Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/create-task')}>
          Create Task
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Reporter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
=======
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
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
<<<<<<< HEAD
                <TableCell>{getMainDescription(task.description)}</TableCell>
                <TableCell>{extractField(task.description, 'Reporter')}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => navigate(`/view-task/${task.id}`)}
                    sx={{ mr: 1 }}
                  >
                    View
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="primary"
                    onClick={() => navigate(`/edit-task/${task.id}`)}
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    onClick={async () => {
                      const confirmed = window.confirm('Delete this task?');
                      if (confirmed) {
                        await fetch(`http://localhost:5000/api/tasks/${task.id}`, {
                          method: 'DELETE',
                          credentials: 'include',
                        });
                        fetchTasks(); // Refresh
                      }
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {tasks.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">No tasks found</TableCell>
              </TableRow>
            )}
=======
                <TableCell>{task.reporter}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button size="small" variant="text" color="primary">View</Button>
                  <Button size="small" variant="text" color="warning">Edit</Button>
                  <Button size="small" variant="text" color="error">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
<<<<<<< HEAD
};

export default Dashboard;
=======
}
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
