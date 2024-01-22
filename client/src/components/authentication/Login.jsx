import React, { useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { API_LINK, USER_AUTH_TOKEN } from "../../core";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleRedirect, setToggleRedirect] = useState(false);

  const isAuthenticatedDispatch = useDispatch();
  const userInfoDispatch = useDispatch();

  const { isAuthenticated } = useSelector(
    (state) => state.isAuthenticatedReducer
  );
  // const { userInfo } = useSelector(
  //   (state) => state.userInfoReducer
  // );

  const login = async (e) => {
    e.preventDefault();

    // form validation
    if (username === "" || password === "") {
      setErrorMessage("Username or Password is missing!");
    } else if (username && password) {
      setErrorMessage("");
      // alert("bef")

      // if form valid call api
      const response = await fetch(`${API_LINK}/login`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      
      if (response.ok) {
        console.log(response);

        await response.json().then((userInfo) => {
          console.log(userInfo, "userInfo");
          console.log(isAuthenticated, "isAuthenticated before dispatch");

          if (Cookies.get(USER_AUTH_TOKEN)) {
            isAuthenticatedDispatch({
              type: "authorize",
            });

            userInfoDispatch({
              type: "addUserInfo",
              payload: userInfo,
            });
            
            toast.success("Logged in successfuly!");
          }

          console.log(isAuthenticated, "isAuthenticated after dispatch");
        });

        setToggleRedirect(true);
      } else {
        console.log(response);
        setErrorMessage("Login failed! Please try again.");
        toast.error("Login failed!\nPlease try again.")
      }
    }
  };

  // Redirect to
  if (toggleRedirect) {
    console.log("asdfasdfasdf");
    return <Navigate to="/home" />;
  }

  if (isAuthenticated) {
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
