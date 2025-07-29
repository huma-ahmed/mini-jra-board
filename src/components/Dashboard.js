import React, { useContext, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const tableRef = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          credentials: 'include',
        });
        const data = await res.json();

        const cleanedTasks = data.map((task) => {
          const lines = task.description.split('\n');
          const mainDesc = lines[0];
          let reporter = '', comment = '';

          lines.slice(1).forEach((line) => {
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
            comment,
          };
        });

        dispatch({ type: 'SET_TASKS', payload: cleanedTasks });
      } catch (err) {
        console.error('Failed to fetch tasks:', err);
      }
    };

    fetchTasks();
  }, [dispatch]);

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this task?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        dispatch({ type: 'DELETE_TASK', payload: taskId });
      } else {
        alert('Failed to delete task');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      dispatch({ type: 'LOGOUT' }); // optional, in case you track user state
      navigate('/');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const memoizedTasks = useMemo(() => state.tasks, [state.tasks]);

  useEffect(() => {
    if (tableRef.current) {
      console.log('📦 Task table mounted:', tableRef.current);
    }
  }, []);

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Welcome {state.username || 'User'}</Typography>
        <Box display="flex" gap={2}>
          <Button variant="contained" onClick={() => navigate('/create-task')}>
            Create Task
          </Button>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" mt={3}>
        Tasks
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table ref={tableRef}>
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
            {memoizedTasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell>{task.name}</TableCell>
                <TableCell>{task.mainDesc}</TableCell>
                <TableCell>{task.reporter}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <Button onClick={() => navigate(`/view-task/${task.id}`)}>View</Button>
                  <Button onClick={() => navigate(`/edit-task/${task.id}`)}>Edit</Button>
                  <Button onClick={() => handleDelete(task.id)} color="error">
                    Delete
                  </Button>
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