import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
import EditTask from './components/EditTask';
import ViewTask from './components/ViewTask';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task/:taskId" element={<EditTask />} />
          <Route path="/view-task/:taskId" element={<ViewTask />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;                                                                                                                                           