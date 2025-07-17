import React, { useState } from 'react';
import {
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
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          margin="normal"
        />

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