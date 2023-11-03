import React, { useContext, useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { API_LINK, USER_AUTH_TOKEN } from "../../core";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../utils/UserContext";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
	const [redirect, setRedirect] = useState(false);
	const { setUserInfo } = useContext(UserContext);
  
  const isAuthenticatedDispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state) => state.isAuthenticatedReducer
  );

  const login = async (e) => {
    e.preventDefault();

    // form validation
    if (username === "" || password === "") {
      setErrorMessage("Username or Password is missing!");
    } else if (username && password) {
      setErrorMessage("");

      // if form valid call api
      const response = await fetch(`${API_LINK}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (response.ok) {
        console.log(response);

        response.json().then((userInfo) => {
          console.log(userInfo, "userInfo");
          // setUserInfo(userInfo);
          console.log(isAuthenticated, "isAuthenticated before dispatch");

          if (Cookies.get(USER_AUTH_TOKEN)) {
            isAuthenticatedDispatch({
              type: "authorize",
            });
          }

          console.log(isAuthenticated, "isAuthenticated after dispatch");
        });
        
        // redirect to Home Page
        setRedirect(true);
        // navigate("/login");
        // alert("Registration successful.");
      } else {
        console.log(response);
        setErrorMessage("Login Failed! Please try again.");
      }
    }
  };

  // Redirect to 
  if (redirect) {
		return <Navigate to="/home" />;
	}

  return (
    <section id="login">
      <div className="container">
        <div className="title">
          <h2>Log in to</h2>
          <h1>Contacts App</h1>
        </div>
        <form onSubmit={login}>
          <input
            value={username}
            type="text"
            placeholder="Enter Username"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <div className="pwdGroup">
            <input
              value={password}
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
          {errorMessage !== "" && (
            <div className="errMessage">
              <FiInfo />
              <p>{errorMessage}</p>
            </div>
          )}
          <input type="submit" value="Log In" />
        </form>
      </div>
    </section>
  );
};

export default Login;
