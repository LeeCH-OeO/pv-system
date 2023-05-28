import React from "react";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import UserMainPage from "./components/UserPage/UserMainPage";
import ProjectList from "./components/UserPage/project/ProjectList/ProjectList";
import CompanySignUp from "./components/CompanySignUp/CompanySignUp";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <h1>123</h1>
      <Link to="/user/signup"> User Sign up</Link>
      <Link to="/company/signup">Company Sign up</Link>

      <Routes>
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/company/signup" element={<CompanySignUp />} />
        <Route path="/user/main" element={<UserMainPage />} />
        <Route path="/user/projects" element={<ProjectList />} />
      </Routes>
    </Router>
  );
};

export default App;
