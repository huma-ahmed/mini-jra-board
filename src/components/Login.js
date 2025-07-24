import React, { useState } from 'react';
import { Button, Card, TextField, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Both username and password are required.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'  // ✅ This is crucial
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful:", data);
        setError('');
        navigate('/dashboard'); // Redirect on login success
      } else {
        setError(data?.error || "Login failed. Try again.");
      }
    } catch (err) {
      console.error("❌ Network/server error:", err);
      setError("Server error. Please try again later.");
    }
=======
  const handleLogin = () => {
    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }
    setError('');
    navigate('/dashboard');
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgcolor="#f5f5f5">
      <Card sx={{ padding: 4, width: 350, boxShadow: 3 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Login
        </Typography>
<<<<<<< HEAD

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <Typography color="error" variant="body2" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => navigate('/register')}
        >
=======
        <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
        <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Typography color="error" variant="body2">{error}</Typography>}
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleLogin}>Login</Button>
        <Button variant="text" fullWidth sx={{ mt: 1 }} onClick={() => navigate('/register')}>
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
          Don't have an account? Register
        </Button>
      </Card>
    </Box>
  );
}