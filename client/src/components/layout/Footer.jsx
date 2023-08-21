import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <section id="footer">
      <motion.div
        className="info"
        initial={{ x: "-100%" }}
        whileInView={{ x: 0 }}
      >
        <p>Made with ❤️ by &copy; Varun Maharana.</p>
        <p>
          Visit Github Repository.
          <a
            href="https://github.com/varunmaharana/mern-contacts-app"
            target="_blank"
          >
            <FaGithub />
          </a>
        </p>
      </motion.div>
      <motion.div className="logo">
        <Link to="/">Contacts App</Link>
      </motion.div>
    </section>
  );
};

export default Footer;
