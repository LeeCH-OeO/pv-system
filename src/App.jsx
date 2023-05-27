import React from "react";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import UserMainPage from "./components/UserPage/UserMainPage";
import Project from "./components/UserPage/project/Project";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <h1>123</h1>
      <Link to="/user/signup">Sign up</Link>

      <Routes>
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/user/main" element={<UserMainPage />} />
        <Route path="/user/projects" element={<Project />} />
      </Routes>
    </Router>
  );
};

export default App;
