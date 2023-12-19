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

const ContactCard = ({
  namePrefix,
  firstName,
  middleName,
  lastName,
  nameSuffix,
  phoneNumber,
  emailAddress,
  address,
}) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div id="contactCard">
      <div className="content">
        <div className="avatar">
          <img src={tempdp} alt="avatar" />
        </div>
        <div className="info">
          <h3 className="fullName">
            {namePrefix && <span className="namePrefix">{namePrefix} </span>}
            {firstName && <span className="firstName">{firstName} </span>}
            {middleName && <span className="middleName">{middleName} </span>}
            {lastName && <span className="lastName">{lastName}</span>}
            {nameSuffix && <span className="nameSuffix">, {nameSuffix}</span>}
          </h3>
          {phoneNumber && <p className="phoneNumber">
            <MdPhone />
            &nbsp;{phoneNumber}
          </p>}
          {emailAddress && <p className="emailAddress">
            <MdEmail />
            &nbsp;{emailAddress}
          </p>}
          {address && <p className="address">
            <MdLocationOn />
            &nbsp;{address}
          </p>}
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
