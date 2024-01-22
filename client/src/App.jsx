import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store";

// Importing Components
import Home from "./components/home/Home";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/Signup";
import NotFound from "./components/layout/NotFound";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ViewProfile from "./components/profile/ViewProfile";
import EditProfile from "./components/profile/EditProfile";
import CreateContact from "./components/contact/CreateContact";
import ViewContact from "./components/contact/ViewContact";
import EditContact from "./components/contact/EditContact";

// Importing Styles
import "./styles/app.scss";
import "./styles/header.scss";
import "./styles/footer.scss";
import "./styles/login.scss";
import "./styles/signup.scss";
import "./styles/home.scss";
import "./styles/contactCard.scss";
import "./styles/createContact.scss";
import "./styles/editContact.scss";
import "./styles/viewContact.scss";
import "./styles/loader.scss"

const App = () => {
  // const { isAuthenticated } = useContext(UserContext);

  const { isAuthenticated } = useSelector(
    (state) => state.isAuthenticatedReducer
  );

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile" element={<ViewProfile />} />
        <Route path="/myprofile/edit" element={<EditProfile />} />
        <Route path="/contact/create" element={<CreateContact />} />
        <Route path="/contact/:id" element={<ViewContact />} />
        <Route path="/contact/:id/edit" element={<EditContact />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
