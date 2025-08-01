import React, { useReducer } from 'react';
import { Button, Card, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Initial form state
const initialState = {
  username: '',
  password: '',
  errors: {},
};

// Reducer for form state and validation
const reducer = (state, action) => {
  switch (action.type) {
    case 'FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' }, // clear field-specific error
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!state.username.trim()) errors.username = 'Username is required';
    if (!state.password.trim()) errors.password = 'Password is required';
    return errors;
  };

  const handleLogin = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username: state.username, password: state.password }),
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'RESET' });
        navigate('/dashboard');
      } else {
        dispatch({
          type: 'SET_ERRORS',
          errors: { general: data.error || 'Login failed' },
        });
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERRORS',
        errors: { general: 'Server error. Please try again later.' },
      });
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ padding: 4, width: 350, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>Login</Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={state.username}
          onChange={(e) => dispatch({ type: 'FIELD', field: 'username', value: e.target.value })}
          error={!!state.errors.username}
          helperText={state.errors.username}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={state.password}
          onChange={(e) => dispatch({ type: 'FIELD', field: 'password', value: e.target.value })}
          error={!!state.errors.password}
          helperText={state.errors.password}
        />

        {state.errors.general && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {state.errors.general}
          </Typography>
        )}

        <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>
          Login
        </Button>

        <Button variant="text" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
          Don't have an account? Register
        </Button>
      </Card>
    </Box>
  );
}