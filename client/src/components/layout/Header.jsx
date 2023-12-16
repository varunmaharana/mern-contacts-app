import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdAccountCircle, MdLogout, MdLogin, MdPerson, MdPersonAdd } from "react-icons/md";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { USER_AUTH_TOKEN } from "../../core";

const Header = ({ isAuthenticated }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [stickyState, setStickyState] = useState(false);
  const [authTokenPresent, setAuthTokenPresent] = useState(false);

  useEffect(() => {
    if (Cookies.get(USER_AUTH_TOKEN)) {
      setAuthTokenPresent(true);
    } else {
      setAuthTokenPresent(false);
      isAuthenticatedDispatch({
        type: "unauthorize",
      });
    }
  }, []);

  // const { isAuthenticated } = useContext(UserContext);
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > 100) {
      setStickyState(true);
    }
    if (scrollPosition === 0) {
      setStickyState(false);
    }
  }, [scrollPosition]);

  const isAuthenticatedDispatch = useDispatch();

  const logout = () => {
    console.log(isAuthenticated, "isAuthenticated before h dispatch");
    
    // Delete token and unauthorize user
    if (Cookies.get(USER_AUTH_TOKEN)) {
      Cookies.remove(USER_AUTH_TOKEN);
      setAuthTokenPresent(false);
      isAuthenticatedDispatch({
        type: "unauthorize",
      });
    }

    // if (Cookies.get(USER_AUTH_TOKEN)) {
    // } 
    // else {
    //   console.log("else");
    //   isAuthenticatedDispatch({
    //     type: "unauthorize",
    //   });
    // }

    console.log(isAuthenticated, "isAuthenticated after h dispatch");

  }

  return (
    <motion.section
      // initial={{ y: "-100%" }}
      // whileInView={{ y: 0 }}
      // transition={{ type: "just" }}
      id="header"
      style={stickyState ? { position: "sticky" } : {}}
    >
      <motion.div className="logo">
        <Link to="/">Contacts App</Link>
      </motion.div>

      <motion.nav initial={{ y: "-100%" }} whileInView={{ y: 0 }}>
        {isAuthenticated ? (
          // Logged in state
          <section>
            <Link to="/contact/create">
              <MdPersonAdd /> <span>Create</span>
            </Link>
            <Link to="/myprofile">
              <MdAccountCircle /> <span>Profile</span>
            </Link>
            <Link to="/login" onClick={logout}>
              <MdLogout />
              <span>Logout</span>
            </Link>
          </section>
        ) : (
          // Logged Out State 
          <section>
            <Link to="/signup">
              <MdPerson />
              <span>Sign Up</span>
            </Link>
            <Link to="/login">
              <MdLogin />
              <span>Log In</span>
            </Link>
          </section>
        )}

      </motion.nav>
    </motion.section>
  );
};

export default Header;
