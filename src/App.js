import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Enverlope from './pages/Enverlope';

function App() {
  return (
    <Router basename="/valentinka">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/enverlope" element={<Enverlope />} />

      </Routes>
    </Router>
  );
}

export default App;
