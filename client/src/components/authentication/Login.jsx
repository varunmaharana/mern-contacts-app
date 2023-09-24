import React, { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section id="login">
      <div className="container">
        <div className="title">
          <h2>Log in to</h2>
          <h1>Contacts App</h1>
        </div>
        <form action="">
          <input type="text" placeholder="Enter Username" />
          <div className="pwdGroup">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
          <div className="errMessage">
            <FiInfo />
            <p>Passwords do not match!</p>
          </div>
          <input type="submit" value="Log In" />
        </form>
      </div>
    </section>
  );
};

export default Login;
