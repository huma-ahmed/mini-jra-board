import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';import CreateTask from './components/CreateTask';import EditTask from './components/EditTask';    import ViewTask from './components/ViewTask';    

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />       
        <Route path="/edit-task/:id" element={<EditTask />} />        
        <Route path="/view-task/:id" element={<ViewTask />} />
      </Routes>
    </Router>
  );
}

export default App;
