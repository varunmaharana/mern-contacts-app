import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdAccountCircle, MdLogout, MdLogin, MdPerson } from "react-icons/md";
import { UserContext } from "../../utils/UserContext";
import { useDispatch } from "react-redux";

const Header = ({ isAuthenticated }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [stickyState, setStickyState] = useState(false);
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

  // useEffect(() => {

  // },[isAuthenticated]);

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
    isAuthenticatedDispatch({
      type: "unauthorize",
    });
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
