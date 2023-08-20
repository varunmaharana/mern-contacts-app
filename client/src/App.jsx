import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing Components
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/SignUp";
import NotFound from "./components/layout/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ViewProfile from "./components/profile/ViewProfile";
import EditProfile from "./components/profile/EditProfile";
import ViewContact from "./components/contact/ViewContact";
import EditContact from "./components/contact/EditContact";

// Importing Styles
import "./styles/App.scss";
import "./styles/header.scss";

const App = () => {
  return (
    <div className="App">
      <Header isAuthenticated={false} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile" element={<ViewProfile />} />
        <Route path="/myprofile/edit" element={<EditProfile />} />
        <Route path="/contact/:id" element={<ViewContact />} />
        <Route path="/contact/edit/:id" element={<EditContact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
