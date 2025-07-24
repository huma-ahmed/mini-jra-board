import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateTask from './components/CreateTask';
<<<<<<< HEAD
import EditTask from './components/EditTask';    
import ViewTask from './components/ViewTask';    
=======
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-task" element={<CreateTask />} />
<<<<<<< HEAD
        <Route path="/edit-task/:id" element={<EditTask />} />
        <Route path="/view-task/:id" element={<ViewTask />} />
=======
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
      </Routes>
    </Router>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> c9f996371e88373e6cf7efb0c150370810fdcb5f
