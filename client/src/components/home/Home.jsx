import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useSelector(
    (state) => state.isAuthenticatedReducer
  );

  const { userInfo } = useSelector(
    (state) => state.userInfoReducer
  );

  console.log("User Info:",userInfo);

  if (!isAuthenticated) {
		return <Navigate to="/login" />;
  }



  return <section>Home</section>;
};

export default Home;
