import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";
import { API_LINK } from "../../core";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypedPassword, setShowRetypedPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
	const [redirect, setRedirect] = useState(false);

  const register = async (e) => {
    e.preventDefault();

    // form validation
    if (username === "" || password === "") {
      setErrorMessage("Username or Password is missing!");
    } else if (password !== retypedPassword) {
      setErrorMessage("Passwords do not match!");
    } else if (username && password === retypedPassword) {
      setErrorMessage("");

      // if form valid call api
      const response = await fetch(`${API_LINK}/register`, {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        console.log(response);

        // redirect to Login Page
        setRedirect(true);
        // navigate("/login");
        // alert("Registration successful.");
      } else {
        console.log(response);
        setErrorMessage("Registration Failed! Please try again.");
      }
    }
  };

  if (redirect) {
		return <Navigate to="/login" />;
	}

  return (
    <section id="signup">
      <div className="container">
        <div className="title">
          <h2>Create a new account on the</h2>
          <h1>Contacts App</h1>
        </div>
        <form onSubmit={register}>
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
          <div className="pwdGroup">
            <input
              value={retypedPassword}
              type={showRetypedPassword ? "text" : "password"}
              placeholder="Re-enter password"
              onChange={(ev) => setRetypedPassword(ev.target.value)}
            />
            <span onClick={() => setShowRetypedPassword(!showRetypedPassword)}>
              {showRetypedPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
          {errorMessage !== "" && (
            <div className="errMessage">
              <FiInfo />
              <p>{errorMessage}</p>
            </div>
          )}
          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </section>
  );
};

export default SignUp;
