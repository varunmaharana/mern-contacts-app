import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

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
          <input type="text" placeholder="Username" />
          <div className="pwdGroup">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
