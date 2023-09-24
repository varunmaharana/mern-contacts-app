import React, { useState } from "react";
import { FiEye, FiEyeOff, FiInfo } from "react-icons/fi";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypedPassword, setShowRetypedPassword] = useState(false);


  return (
    <section id="signup">
      <div className="container">
        <div className="title">
          <h2>Create a new account on the</h2>
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
          <div className="pwdGroup">
            <input
              type={showRetypedPassword ? "text" : "password"}
              placeholder="Re-enter password"
            />
            <span onClick={() => setShowRetypedPassword(!showRetypedPassword)}>
              {showRetypedPassword ? <FiEye /> : <FiEyeOff />}
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

export default SignUp;
