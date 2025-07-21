import React, { useEffect, useState } from 'react';
import {
  Box, TextField, Button, Typography, MenuItem, Paper
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const reporterList = ['Ali', 'Zohan', 'Sara', 'Ayesha'];

function EditTask() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter] = useState('');
  const [status, setStatus] = useState('');
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/tasks`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        const task = data.find(t => t.id === parseInt(id));
        if (task) {
          setName(task.name);
          setStatus(task.status);

          const fullDesc = task.description || '';
          const mainDesc = fullDesc.split('\n')[0].trim();
          setDescription(mainDesc);

          const reporterMatch = fullDesc.match(/Reporter:\s*(.*)/);
          setReporter(reporterMatch ? reporterMatch[1].trim() : '');

          const commentMatch = fullDesc.match(/Comment:\s*(.*)/);
          setComment(commentMatch ? commentMatch[1].trim() : '');
        }
      });
  }, [id]);

  const handleUpdate = async () => {
    const fullDescription = `${description}\nReporter: ${reporter}${comment ? `\nComment: ${comment}` : ''}`;

    const response = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ name, description: fullDescription, status }),
    });

    if (response.ok) {
      navigate('/dashboard');
    } else {
      alert('Failed to update task');
    }
  };

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}>
      <Typography variant="h5" gutterBottom>Edit Task</Typography>
      <TextField label="Task Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
      <TextField label="Task Description" fullWidth multiline minRows={3} margin="normal" value={description} onChange={e => setDescription(e.target.value)} />
      <TextField select label="Reporter" fullWidth margin="normal" value={reporter} onChange={e => setReporter(e.target.value)}>
        {reporterList.map((r) => <MenuItem key={r} value={r}>{r}</MenuItem>)}
      </TextField>
      <TextField select label="Status" fullWidth margin="normal" value={status} onChange={e => setStatus(e.target.value)}>
        {['To-Do', 'In Progress', 'Completed', 'Blocked'].map((s) => (
          <MenuItem key={s} value={s}>{s}</MenuItem>
        ))}
      </TextField>
      <TextField label="Comment (Optional)" fullWidth margin="normal" multiline minRows={2} value={comment} onChange={e => setComment(e.target.value)} />
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleUpdate}>Update Task</Button>
      </Box>
    </Paper>
  );
}

export default EditTask;