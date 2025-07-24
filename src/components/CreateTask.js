import React, { useState } from 'react';
import {
  Box, Button, MenuItem, TextField, Typography, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('TO-DO');
  const [reporter, setReporter] = useState('');
  const [comment, setComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalDescription = `${description}\nReporter: ${reporter}${comment ? `\nComment: ${comment}` : ''}`;

    try {
      const response = await fetch('http://localhost:5000/api/tasks', { // <== FIXED URL
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: taskName,
          description: finalDescription,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error('Task creation failed');
      }

      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Task creation failed. Please check inputs or try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: '80%', mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Create Task</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          id="taskName"
          label="Task Name"
          name="taskName"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <TextField
          id="description"
          label="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <TextField
          id="reporter"
          select
          label="Reporter"
          name="reporter"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
          required
        >
          <MenuItem value="Ali">Ali</MenuItem>
          <MenuItem value="Zohan">Zohan</MenuItem>
          <MenuItem value="Omama">Omama</MenuItem>
        </TextField>
        <TextField
          id="status"
          select
          label="Status"
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <MenuItem value="TO-DO">TO-DO</MenuItem>
          <MenuItem value="IN-PROGRESS">IN-PROGRESS</MenuItem>
          <MenuItem value="BLOCKED">BLOCKED</MenuItem>
          <MenuItem value="COMPLETED">COMPLETED</MenuItem>
        </TextField>

        <Box display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={() => setShowCommentModal(true)}>Add Comment</Button>
          <Button type="submit" variant="contained" color="primary">Create Task</Button>
        </Box>
      </Box>

      <CommentModal
        open={showCommentModal}
        onClose={() => setShowCommentModal(false)}
        onSave={(value) => {
          setComment(value);
          setShowCommentModal(false);
        }}
        value={comment}
      />
    </Paper>
  );
};

export default CreateTask;