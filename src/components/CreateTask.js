import React, { useState } from 'react';
import {
<<<<<<< HEAD
  Box, Button, TextField, Typography, MenuItem,
  Paper, Dialog, DialogTitle, DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [reporter, setReporter] = useState('');
  const [status, setStatus] = useState('TO-DO');
  const [comment, setComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);

  const reporterOptions = ['Ali', 'Sara', 'Zohan', 'Ahmed'];
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!taskName || !description || !reporter || !status) {
      alert("Please fill in all required fields.");
      return;
    }

    const fullDescription =
      `${description.trim()}\nReporter: ${reporter}` +
      (comment ? `\nComment: ${comment.trim()}` : '');

    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: taskName,
          description: fullDescription,
          status: status
        })
      });

      if (response.ok) {
        navigate('/dashboard');
      } else {
        const err = await response.text();
        console.error('Task creation failed:', err);
        alert('Failed to create task');
      }
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Something went wrong');
    }
  };

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <Typography variant="h5" gutterBottom>Create Task</Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <TextField
          fullWidth
          label="Task Name"
=======
  Box,
  Typography,
  TextField,
  Button,
  Card
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';

export default function CreateTask() {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setAttachment(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (!taskName.trim() || !description.trim()) {
      setError('Task Name and Description are required.');
      return;
    }

    setError('');

    const formData = {
      taskName,
      description,
      attachment: attachment ? attachment.name : null,
      comment
    };

    console.log('Task Submitted:', formData);
    alert('Task created successfully!');
    navigate('/dashboard');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100vw',
        bgcolor: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: 4,
      }}
    >
      <Card sx={{ p: 4, width: '100%', maxWidth: 700, boxShadow: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create Task
        </Typography>

        <TextField
          label="Task Name"
          variant="outlined"
          fullWidth
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          margin="normal"
        />
<<<<<<< HEAD
        <TextField
          fullWidth
          label="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
          multiline
          rows={4}
        />
        <TextField
          select
          fullWidth
          label="Reporter"
          value={reporter}
          onChange={(e) => setReporter(e.target.value)}
          margin="normal"
        >
          {reporterOptions.map((option, idx) => (
            <MenuItem key={idx} value={option}>{option}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          margin="normal"
        >
          {['TO-DO', 'IN PROGRESS', 'BLOCKED', 'COMPLETED'].map((statusOption, idx) => (
            <MenuItem key={idx} value={statusOption}>{statusOption}</MenuItem>
          ))}
        </TextField>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Button variant="outlined" onClick={() => setShowCommentModal(true)}>Add Comment</Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>Create Task</Button>
        </Box>
      </Paper>

      {/* Comment Modal */}
      <Dialog open={showCommentModal} onClose={() => setShowCommentModal(false)}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            fullWidth
            multiline
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCommentModal(false)}>Cancel</Button>
          <Button
            onClick={() => setShowCommentModal(false)}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreateTask;
=======

        <TextField
          label="Task Description"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />

        <Button
          variant="contained"
          component="label"
          sx={{ mt: 2 }}
        >
          Upload Attachment (Optional)
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>

        {attachment && (
          <Typography variant="body2" mt={1}>
            Selected: {attachment.name}
          </Typography>
        )}

        {error && (
          <Typography color="error" variant="body2" mt={2}>
            {error}
          </Typography>
        )}

        <Box mt={4} display="flex" justifyContent="space-between">
          <Button
            variant="outlined"
            onClick={() => setIsCommentModalOpen(true)}
          >
            Add Comment
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
          >
            Submit Task
          </Button>
        </Box>
      </Card>

      <CommentModal
        open={isCommentModalOpen}
        handleClose={() => setIsCommentModalOpen(false)}
        comment={comment}
        setComment={setComment}
      />
    </Box>
  );
}
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
