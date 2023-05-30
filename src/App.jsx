import React from "react";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import UserMainPage from "./components/UserPage/UserMainPage";
import ProjectList from "./components/UserPage/project/ProjectList/ProjectList";
import CompanySignUp from "./components/CompanySignUp/CompanySignUp";
import HomePage from "./components/HomePage/HomePage";
import CreateProjectPage from "./components/UserPage/project/CreateProject/CreateProjectPage";
import ProfilePage from "./components/UserPage/Profile/ProfilePage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/user/signup" element={<UserSignUp />} />
        <Route path="/company/signup" element={<CompanySignUp />} />
        <Route path="/user/main" element={<UserMainPage />} />
        <Route path="/user/projects" element={<ProjectList />} />
        <Route path="/user/new-project" element={<CreateProjectPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;
