import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ViewTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const extractField = (desc, label) => {
    const regex = new RegExp(`${label}:\\s*(.*)`, 'i');
    const match = desc.match(regex);
    return match ? match[1].trim() : '';
  };

  const getPureDescription = (desc) => {
    return desc.split('\n')[0].trim();
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => String(t.id) === String(taskId));
        if (found) {
          setTask(found);
        } else {
          setTask(null);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching task:', err);
        setLoading(false);
      });
  }, [taskId]);

  if (loading) return <Typography>Loading...</Typography>;

  if (!task) {
    return (
      <Box p={3} maxWidth={600} mx="auto">
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h6" color="error">
            Task not found.
          </Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom>Task Details</Typography>
        <Typography><strong>Task Name:</strong> {task.name}</Typography>
        <Typography><strong>Description:</strong> {getPureDescription(task.description)}</Typography>
        <Typography><strong>Reporter:</strong> {extractField(task.description, 'Reporter') || 'N/A'}</Typography>
        <Typography><strong>Comment:</strong> {extractField(task.description, 'Comment') || 'N/A'}</Typography>
        <Typography><strong>Status:</strong> {task.status}</Typography>

        <Box mt={2}>
          <Button variant="outlined" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ViewTask;