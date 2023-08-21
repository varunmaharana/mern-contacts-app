import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdAccountCircle, MdLogout, MdLogin, MdPerson } from "react-icons/md";

const Header = ({ isAuthenticated }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [stickyState, setStickyState] = useState(false);
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
        <section style={isAuthenticated ? {} : { display: "none" }}>
          <Link to="/myprofile">
            <MdAccountCircle /> <span>Profile</span>
          </Link>
          <Link to="/login">
            <MdLogout />
            <span>Logout</span>
          </Link>
        </section>
        <section style={isAuthenticated ? { display: "none" } : {}}>
          <Link to="/signup">
            <MdPerson />
            <span>Sign Up</span>
          </Link>
          <Link to="/login">
            <MdLogin />
            <span>Log In</span>
          </Link>
        </section>
      </motion.nav>
    </motion.section>
  );
};

export default Header;
