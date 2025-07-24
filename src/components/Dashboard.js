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
      const res = await fetch('http://localhost:5000/api/tasks', {
        credentials: 'include'
      });
      const data = await res.json();

      const cleanedTasks = data.map(task => {
        const lines = task.description.split('\n');
        const mainDesc = lines[0];
        let reporter = '', comment = '';

        lines.slice(1).forEach(line => {
          if (line.startsWith('Reporter:')) {
            reporter = line.replace('Reporter:', '').trim();
          } else if (line.startsWith('Comment:')) {
            comment = line.replace('Comment:', '').trim();
          }
        });

        return {
          ...task,
          mainDesc,
          reporter,
          comment
        };
      });

      setTasks(cleanedTasks);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
     if (!confirmDelete) return;

       try {
       const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include'
       });

       if (res.ok) {
        setTasks(tasks.filter(task => task.id !== taskId));
       } else {
        alert('Failed to delete task');
       }
       } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Welcome Dummy</Typography>
        <Button variant="contained" onClick={() => navigate('/create-task')}>Create Task</Button>
      </Box>

      <Typography variant="h6" mt={3}>Tasks</Typography>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Reporter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.mainDesc}</TableCell>
                <TableCell>{task.reporter}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/view-task/${task.id}`)}>View</Button>
                  <Button onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</Button>
                  <Button onClick={() => handleDelete(task.id)} color="error">Delete</Button>
                  {/* Optional delete */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Dashboard;