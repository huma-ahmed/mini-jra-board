import React, { useEffect, useReducer, useState } from 'react';
import {
  Box, Button, MenuItem, TextField, Typography, Paper
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import CommentModal from './CommentModal';

// Initial state
const initialState = {
  taskName: '',
  description: '',
  reporter: '',
  status: '',
  errors: {}
};

// Reducer
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SET_ALL_FIELDS':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const EditTask = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [state, dispatch] = useReducer(formReducer, initialState);
  const [reporterList, setReporterList] = useState([]);
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
    const fetchTaskAndReporters = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/tasks', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch tasks');

        const data = await res.json();

        // Populate reporter dropdown
        const reporters = new Set();
        data.forEach(t => {
          const match = t.description.match(/Reporter:\s*(.+)/);
          if (match) reporters.add(match[1].split('\n')[0].trim());
        });
        setReporterList([...reporters]);

        // Find the task to edit
        const task = data.find((t) => t.id === parseInt(taskId));
        if (!task) throw new Error('Task not found');

        const parsed = parseDescription(task.description);
        dispatch({
          type: 'SET_ALL_FIELDS',
          payload: {
            taskName: task.name,
            description: parsed.description,
            reporter: parsed.reporter,
            status: task.status,
          }
        });
        setComment(parsed.comment);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    };

    fetchTaskAndReporters();
  }, [taskId]);

  const validate = () => {
    const errors = {};
    if (!state.taskName.trim()) errors.taskName = 'Task Name is required.';
    if (!state.description.trim()) errors.description = 'Description is required.';
    if (!state.reporter.trim()) errors.reporter = 'Reporter must be selected.';
    if (!state.status.trim()) errors.status = 'Status is required.';
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    const fullDescription = `${state.description}\nReporter: ${state.reporter}${comment ? `\nComment: ${comment}` : ''}`;

    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: state.taskName,
          description: fullDescription,
          status: state.status,
        }),
      });

      if (!res.ok) throw new Error('Failed to update task');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Task update failed. Try again.');
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
          value={state.taskName}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'taskName', value: e.target.value })}
          error={!!state.errors.taskName}
          helperText={state.errors.taskName}
          required
        />

        <TextField
          label="Description"
          value={state.description}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'description', value: e.target.value })}
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
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'reporter', value: e.target.value })}
          error={!!state.errors.reporter}
          helperText={state.errors.reporter}
          required
        >
          {reporterList.map((name) => (
            <MenuItem key={name} value={name}>{name}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Status"
          value={state.status}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'status', value: e.target.value })}
          error={!!state.errors.status}
          helperText={state.errors.status}
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