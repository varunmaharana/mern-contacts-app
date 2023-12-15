import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ContactCard from "../contact/ContactCard";
import { API_LINK } from "../../core";

const Home = () => {
  const { isAuthenticated } = useSelector(
    (state) => state.isAuthenticatedReducer
  );

  const { userInfo } = useSelector((state) => state.userInfoReducer);
  console.log("User Info:", userInfo);

  const [allUserContacts, setAllUserContacts] = useState([]);

  // Main API Call
  useEffect(() => {
    fetch(`${API_LINK}/getAllUserContacts?userId=${userInfo.id}`).then(
      (response) => {
        response.json().then((contacts) => {
          setAllUserContacts(contacts);
        });
      }
    );
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <section id="home">
      <div className="container">
        {allUserContacts.length > 0 &&
          allUserContacts.map((contact, index) => {
            console.log("found");
            return (
              <ContactCard
                key={index}
                namePrefix={contact.namePrefix}
                firstName={contact.firstName}
                middleName={contact.middleName}
                lastName={contact.lastName}
                nameSuffix={contact.namePrefix}
                phoneNumber={contact.phoneNumber}
                emailAddress={contact.emailAddress}
                address={contact.address}
              />
            );
          })}

        {/* {allUserContacts.length ||
          (allUserContacts.length === 0 && <h1>No contacts found</h1>)} */}
      </div>
    </section>
  );
};

export default Home;
