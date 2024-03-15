import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from './HomePage';
import CleanedFilePage from './CleanedFilePage';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/limpieza" element={<CleanedFilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
