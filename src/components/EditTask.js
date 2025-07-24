import React, { useState, useEffect } from 'react';
import {
  Box, Button, MenuItem, TextField, Typography, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import CommentModal from './CommentModal';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter] = useState('');
  const [status, setStatus] = useState('To-Do');
  const [comment, setComment] = useState('');
  const [openCommentModal, setOpenCommentModal] = useState(false);

  const reporterOptions = ['Ali', 'Sara', 'Zohan'];

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks`, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        const task = data.find(t => t.id === parseInt(taskId));
        if (task) {
          setTaskName(task.name);
          setStatus(task.status);
          setDescription(extractMainDescription(task.description));
          setReporter(extractField(task.description, 'Reporter'));
          setComment(extractField(task.description, 'Comment'));
        }
      });
  }, [taskId]);

  const extractField = (desc, label) => {
    const match = desc.match(new RegExp(`${label}:\\s*(.*)`, 'i'));
    return match ? match[1].trim() : '';
  };

  const extractMainDescription = (desc) => {
    return desc.split('\n')[0].trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullDescription = `${description.trim()}\nReporter: ${reporter}${comment ? `\nComment: ${comment.trim()}` : ''}`;

    const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        name: taskName,
        description: fullDescription,
        status,
      }),
    });

    if (response.ok) {
      navigate('/dashboard');
    } else {
      alert('Failed to update task');
    }
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Paper elevation={3} style={{ padding: 20 }}>
        <Typography variant="h5" gutterBottom>Edit Task</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            margin="normal"
            required
          />
          <TextField
            select
            label="Reporter"
            value={reporter}
            onChange={(e) => setReporter(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            {reporterOptions.map((rep) => (
              <MenuItem key={rep} value={rep}>{rep}</MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            fullWidth
            margin="normal"
            required
          >
            {['To-Do', 'In Progress', 'Completed', 'Blocked'].map((s) => (
              <MenuItem key={s} value={s}>{s}</MenuItem>
            ))}
          </TextField>

          <Button
            variant="outlined"
            onClick={() => setOpenCommentModal(true)}
            style={{ marginTop: 10 }}
          >
            Add/Edit Comment
          </Button>

          <CommentModal
            open={openCommentModal}
            onClose={() => setOpenCommentModal(false)}
            onSave={(val) => {
              setComment(val);
              setOpenCommentModal(false);
            }}
            value={comment}
          />

          <Box mt={2}>
            <Button variant="contained" color="primary" type="submit">Update Task</Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default EditTask;