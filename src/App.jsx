import React from "react";
import GlobalStyles from "./style";
import UserSignUp from "./components/UserSignUp/UserSignUp";
import UserMainPage from "./components/UserPage/UserMainPage";
import ProjectList from "./components/UserPage/project/ProjectList/ProjectList";
import CompanySignUp from "./components/CompanySignUp/CompanySignUp";
import HomePage from "./components/HomePage/HomePage";
import CreateProjectPage from "./components/UserPage/project/CreateProject/CreateProjectPage";
import ProfilePage from "./components/UserPage/Profile/ProfilePage";
import CompanyMainPage from "./components/CompanyPage/CompanyMainPage";
import ProductList from "./components/CompanyPage/CompanyProduct/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductForm from "./components/CompanyPage/CompanyProduct/Form/ProductForm";
import CompanyProfilePage from "./components/CompanyPage/Profile/ProfilePage";
import EditCard from "./components/UserPage/Profile/Card/editCard";
const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/signup" element={<UserSignUp />} />
          <Route path="/company/signup" element={<CompanySignUp />} />
          <Route path="/user/main" element={<UserMainPage />} />
          <Route path="/user/projects" element={<ProjectList />} />
          <Route path="/user/new-project" element={<CreateProjectPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/company/main" element={<CompanyMainPage />} />
          <Route path="/company/products/" element={<ProductList />} />
          <Route path="/company/new-product/" element={<ProductForm />} />
          <Route path="/company/profile/" element={<CompanyProfilePage />} />
          <Route path="/user/edit-profile" element={<EditCard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
