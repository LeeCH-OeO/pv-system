import React from "react";
import GlobalStyles from "./style";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import UserMainPage from "./components/UserPage/MainPage/UserMainPage";
import ProjectList from "./components/UserPage/project/ProjectList/ProjectList";
import CompanySignUp from "./components/CompanySignUp/CompanySignUp";
import HomePage from "./components/HomePage/HomePage";
import CreateProjectPage from "./components/UserPage/project/CreateProject/CreateProjectPage";
import ProfilePage from "./components/UserPage/Profile/ProfilePage";
import CompanyMainPage from "./components/CompanyPage/CompanyMainPage";
import ProductList from "./components/CompanyPage/CompanyProduct/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CompanyProfilePage from "./components/CompanyPage/Profile/ProfilePage";
import EditCard from "./components/UserPage/Profile/Card/EditCard";
import EditProfile from "./components/CompanyPage/Profile/Card/EditProfile";
import ProjectDetail from "./components/UserPage/project/ProjectDetail/ProjectDetail";
import UserSignIn from "./components/UserSignUp/UserSignIn";
import CompanySignIn from "./components/CompanySignUp/CompanySignIn";
const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/signup" element={<UserSignUp />} />
          <Route path="/company/signup" element={<CompanySignUp />} />
          {/* <Route path="/user/main" element={<UserMainPage />} /> */}
          <Route path="/user/projects" element={<ProjectList />} />
          <Route path="/user/project-detail" element={<ProjectDetail />} />
          <Route path="/user/new-project" element={<CreateProjectPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          {/* <Route path="/company/main" element={<CompanyMainPage />} /> */}
          <Route path="/company/products/" element={<ProductList />} />
          <Route path="/company/profile/" element={<CompanyProfilePage />} />
          <Route path="/user/edit-profile" element={<EditCard />} />
          <Route path="/company/edit-profile" element={<EditProfile />} />
          <Route path="/user/signin/" element={<UserSignIn />} />
          <Route path="/company/signin" element={<CompanySignIn />} />
          <Route path="/*" element={<HomePage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
