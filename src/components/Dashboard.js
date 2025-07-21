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
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
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
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;