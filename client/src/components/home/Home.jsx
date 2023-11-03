import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useSelector(
    (state) => state.isAuthenticatedReducer
  );

  if (!isAuthenticated) {
		return <Navigate to="/login" />;
  }

  return <section>Home</section>;
};

export default Home;
