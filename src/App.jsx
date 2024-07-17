import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ActivityFeed from "./components/ActivityFeed";
import ArchivedCalls from "./components/ArchivedCalls";
import ActivityDetail from "./components/ActivityDetail";
import "./styles.css";
import Header from "./components/Logo";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<ActivityFeed />} />
      <Route path="/archived" element={<ArchivedCalls />} />
      <Route path="/call/:id" element={<ActivityDetail />} />
    </Routes>
  </Router>
);

export default App;