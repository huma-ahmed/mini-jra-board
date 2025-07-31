import React, { useReducer, useEffect, useState } from 'react';
import {
  Box, Button, MenuItem, TextField, Typography, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';

const initialState = {
  taskName: '',
  description: '',
  reporter: '',
  status: 'TO-DO',
  errors: {}
};

function formReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const CreateTask = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [comment, setComment] = useState('');
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch users');

        const users = await res.json();
        setUserList(users);
        console.log('📥 Users fetched:', users);

        if (users.length > 0) {
          dispatch({ type: 'UPDATE_FIELD', field: 'reporter', value: users[0].username });
        }

      } catch (error) {
        console.error('❌ Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const validate = () => {
    const errors = {};
    if (!state.taskName.trim()) errors.taskName = 'Task Name is required.';
    if (!state.description.trim()) errors.description = 'Description is required.';
    if (!state.reporter.trim()) errors.reporter = 'Reporter must be selected.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();

    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    const payload = {
      name: state.taskName,
      description: state.description,
      reporter: state.reporter, // ✅ Add reporter to payload
      status: state.status,
      comment: comment || null
    };

    console.log('📤 Sending task creation payload:', payload);

    try {
      const res = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => ({}));
      console.log('📥 Server response:', res.status, data);

      if (!res.ok) {
        throw new Error(data.message || 'Task creation failed');
      }

      dispatch({ type: 'RESET' });
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Error creating task:', err);
      alert('Task creation failed. Please try again.');
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, width: '80%', mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Create Task</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Task Name"
          value={state.taskName}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'taskName', value: e.target.value })}
          error={!!state.errors.taskName}
          helperText={state.errors.taskName}
          required
        />
        <TextField
          label="Description"
          value={state.description}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'description', value: e.target.value })}
          multiline
          rows={4}
          error={!!state.errors.description}
          helperText={state.errors.description}
          required
        />

        <TextField
          select
          label="Reporter"
          value={state.reporter}
          onChange={(e) => {
            console.log('🧾 Reporter selected:', e.target.value);
            dispatch({ type: 'UPDATE_FIELD', field: 'reporter', value: e.target.value });
          }}
          error={!!state.errors.reporter}
          helperText={state.errors.reporter}
          required
        >
          {userList.length === 0 ? (
            <MenuItem disabled>No users found</MenuItem>
          ) : (
            userList.map((user) => (
              <MenuItem key={user.username} value={user.username}>{user.username}</MenuItem>
            ))
          )}
        </TextField>

        <TextField
          select
          label="Status"
          value={state.status}
          onChange={(e) => dispatch({ type: 'UPDATE_FIELD', field: 'status', value: e.target.value })}
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
