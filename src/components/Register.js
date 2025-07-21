import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
      setError("All fields are required.");
      setSuccess('');
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess('');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          // Since you don't collect email in frontend, use dummy email
          email: `${username}@example.com`
        })
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => navigate('/'), 1500); // Redirect to login
      } else {
        setSuccess('');
        setError(data.error || 'Registration failed. Try again.');
      }
    } catch (err) {
      console.error('❌ Registration error:', err);
      setSuccess('');
      setError('Server error. Please try again later.');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleRegister();
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ padding: 4, width: 350, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Register
        </Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
        {success && <Typography color="primary" variant="body2" sx={{ mt: 1 }}>{success}</Typography>}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleRegister}
        >
          Register
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