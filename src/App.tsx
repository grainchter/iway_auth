import React from "react";
import Auth from "./components/Auth";
import "./global.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Info from "./components/Info";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/about" element={<Info />} />
      </Routes>
    </Router>
  );
};
export default App;
