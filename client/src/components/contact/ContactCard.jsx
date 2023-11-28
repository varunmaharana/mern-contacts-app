import React, { useState } from "react";
import {
  MdPhone,
  MdLocationOn,
  MdEmail,
  MdMoreHoriz,
  MdClose,
  MdEdit,
  MdDelete,
} from "react-icons/md";
import { motion } from "framer-motion";

import tempdp from ".././../assets/dp.jpg";
import tempdp2 from ".././../assets/seminar.jpg";

const ContactCard = () => {
  const [toggleMenu, setToggleMenu] = useState(false);


  return (
    <div id="contactCard">
      <div className="content">
        <div className="avatar">
          <img src={tempdp} alt="avatar" />
        </div>
        <div className="info">
          <h3 className="fullName">
            <span className="namePrefix">Mr. </span>
            <span className="firstName">Varun </span>
            <span className="middleName">Nexile </span>
            <span className="lastName">Maharana</span>
            <span className="nameSuffix">, CSE</span>
          </h3>
          <p className="phoneNumber">
            <MdPhone />
            &nbsp;7049504859
          </p>
          <p className="emailAddress">
            <MdEmail />
            &nbsp;varunmaharana95@gmail.com
          </p>
          <p className="address">
            <MdLocationOn />
            &nbsp;Raipur, Chhattisgarh, India
          </p>
        </div>
      </div>

      <div className="menuButton" onClick={() => setToggleMenu(!toggleMenu)}>
        <MdMoreHoriz />
      </div>

      {toggleMenu && (
        <div className="menuOverlay">
          <div
            className="menuCloseButton"
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <MdClose />
          </div>
          <motion.button
            initial={{ x: "-100%" }}
            whileInView={{ x: 0 }}
            className="editButton"
          >
            <MdEdit />
          </motion.button>
          <motion.button
            initial={{ x: "100%" }}
            whileInView={{ x: 0 }}
            className="deleteButton"
          >
            <MdDelete />
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ContactCard;
