import React, { useContext, useEffect, useMemo, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  TableContainer,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import TaskTable from '../components/TaskTable';

const Dashboard = () => {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const currentUser = state.username;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          credentials: 'include',
        });
        const data = await res.json();

        const cleanedTasks = data.map((task) => ({
          ...task,
          name: task.task_name // rename for consistency with frontend display
        }));

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
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include',
      });
      dispatch({ type: 'LOGOUT' });
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
        <Typography variant="h5">Welcome {currentUser || 'User'}</Typography>
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
        <TaskTable
          tasks={memoizedTasks}
          onDelete={handleDelete}
          currentUser={currentUser}
        />
      </TableContainer>
    </Box>
  );
};

export default Dashboard;
