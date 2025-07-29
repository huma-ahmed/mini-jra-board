import React, { useReducer } from 'react';
import {
  Button,
  Card,
  TextField,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Initial state
const initialState = {
  username: '',
  password: '',
  confirmPassword: '',
  errors: {},
  success: '',
  isLoading: false,
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'FIELD':
      return {
        ...state,
        [action.field]: action.value,
        errors: { ...state.errors, [action.field]: '' },
        success: '',
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors,
        success: '',
      };
    case 'SET_SUCCESS':
      return {
        ...state,
        success: action.success,
        errors: {},
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.value,
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

export default function Register() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    if (!state.username.trim()) errors.username = 'Username is required';
    if (!state.password.trim()) errors.password = 'Password is required';
    if (state.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (!state.confirmPassword.trim()) errors.confirmPassword = 'Confirm Password is required';
    if (state.password !== state.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    return errors;
  };

  const handleRegister = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });
      return;
    }

    dispatch({ type: 'SET_LOADING', value: true });

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: state.username.trim(),
          password: state.password,
          email: `${state.username.trim()}@example.com`
        })
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_SUCCESS', success: 'Registration successful! Redirecting to login...' });
        setTimeout(() => navigate('/'), 1500);
      } else {
        dispatch({
          type: 'SET_ERRORS',
          errors: { general: data.error || 'Registration failed. Try again.' }
        });
      }
    } catch (error) {
      dispatch({
        type: 'SET_ERRORS',
        errors: { general: 'Server error. Please try again later.' }
      });
    } finally {
      dispatch({ type: 'SET_LOADING', value: false });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRegister();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
      <Card sx={{ padding: 4, width: 350, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>Register</Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={state.username}
          onChange={(e) => dispatch({ type: 'FIELD', field: 'username', value: e.target.value })}
          onKeyDown={handleKeyDown}
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
          onKeyDown={handleKeyDown}
          error={!!state.errors.password}
          helperText={state.errors.password}
        />

        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={state.confirmPassword}
          onChange={(e) => dispatch({ type: 'FIELD', field: 'confirmPassword', value: e.target.value })}
          onKeyDown={handleKeyDown}
          error={!!state.errors.confirmPassword}
          helperText={state.errors.confirmPassword}
        />

        {state.errors.general && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {state.errors.general}
          </Typography>
        )}

        {state.success && (
          <Typography color="primary" variant="body2" sx={{ mt: 1 }}>
            {state.success}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
          disabled={state.isLoading}
        >
          {state.isLoading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate('/')}
        >
          Already have an account? Login
        </Button>
      </Card>
    </Box>
  );
}