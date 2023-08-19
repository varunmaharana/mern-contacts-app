import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing Styles
import "./styles/app.scss";


const App = () => {
  return;
  <Routes>
    <Route path="/" element={<h1>Homepage</h1>} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/register" element={<RegisterPage />} />
  </Routes>;
};

export default App;
