import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Paper, Button
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const ViewTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const found = data.find(t => t.id === parseInt(taskId));
        if (found) {
          setTask(found);
        }
      });
  }, [taskId]);

  const extractField = (desc, label) => {
    const match = desc.match(new RegExp(`${label}:\\s*(.*)`, 'i'));
    return match ? match[1].trim() : '';
  };

  const getPureDescription = (desc) => {
    return desc.split('\n')[0].trim();
  };

  if (!task) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>Task Details</Typography>
        <Typography><strong>Task Name:</strong> {task.name}</Typography>
        <Typography><strong>Description:</strong> {getPureDescription(task.description)}</Typography>
        <Typography><strong>Reporter:</strong> {extractField(task.description, 'Reporter')}</Typography>
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