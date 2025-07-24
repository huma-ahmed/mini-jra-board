import React, { useEffect, useState } from 'react';
import {
  Box, Button, MenuItem, TextField, Typography, Paper
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [reporter, setReporter] = useState('');
  const [comment, setComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [error, setError] = useState('');

  const parseDescription = (desc) => {
    const reporterMatch = desc.match(/Reporter:\s*(.+)/);
    const commentMatch = desc.match(/Comment:\s*(.+)/);
    const mainDesc = desc.split('Reporter:')[0].trim();

    return {
      description: mainDesc,
      reporter: reporterMatch ? reporterMatch[1].split('\n')[0].trim() : '',
      comment: commentMatch ? commentMatch[1].trim() : '',
    };
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          throw new Error('Failed to fetch tasks');
        }

        const data = await res.json();
        const task = data.find((t) => t.id === parseInt(taskId));

        if (!task) {
          throw new Error('Task not found');
        }

        const parsed = parseDescription(task.description);
        setTaskName(task.name);
        setDescription(parsed.description);
        setReporter(parsed.reporter);
        setComment(parsed.comment);
        setStatus(task.status);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullDescription = `${description}\nReporter: ${reporter}${comment ? `\nComment: ${comment}` : ''}`;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: taskName,
          description: fullDescription,
          status,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update task');
      }

      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Failed to update task');
    }
  };

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 4, width: '80%', mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Edit Task</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          required
        />
        <TextField
          select
          label="Reporter"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
          required
        >
          <MenuItem value="Ali">Ali</MenuItem>
          <MenuItem value="Zohan">Zohan</MenuItem>
          <MenuItem value="Omama">Omama</MenuItem>
        </TextField>
        <TextField
          select
          label="Status"
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
          <Button variant="outlined" onClick={() => setShowCommentModal(true)}>
            Edit Comment
          </Button>
          <Button variant="contained" type="submit">
            Update Task
          </Button>
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

export default EditTask;