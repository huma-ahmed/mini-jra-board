import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    setError('');
    navigate('/dashboard');
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ padding: 4, width: 350, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
        <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
        <Button variant="text" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
          Don't have an account? Register
        </Button>
      </Card>
    </Box>
  );
}