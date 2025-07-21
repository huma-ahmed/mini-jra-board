import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

function ViewTask() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const foundTask = data.find(t => t.id === parseInt(id));
        if (foundTask) setTask(foundTask);
      });
  }, [id]);

  const extract = (label) => {
    const match = task?.description?.match(new RegExp(`${label}:\\s*(.*)`, 'i'));
    return match ? match[1] : '';
  };

  const mainDescription = task?.description?.split('\n')[0] || '';

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}>
      <Typography variant="h5" gutterBottom>Task Details</Typography>
      <Divider sx={{ my: 2 }} />
      {task ? (
        <Box>
          <Typography><strong>Task Name:</strong> {task.name}</Typography>
          <Typography><strong>Description:</strong> {mainDescription}</Typography>
          <Typography><strong>Reporter:</strong> {extract('Reporter')}</Typography>
          <Typography><strong>Status:</strong> {task.status}</Typography>
          {extract('Comment') && (
            <Typography><strong>Comment:</strong> {extract('Comment')}</Typography>
          )}
        </Box>
      ) : (
        <Typography>Loading task...</Typography>
      )}
    </Paper>
  );
}

export default ViewTask;