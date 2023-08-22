import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Main from './pages/main';
import MyJournal from './pages/myjournal';
import UserProfile from './pages/userprofile';
import Journal from './pages/journal';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/myjournal" element={<MyJournal />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}

export default App;
