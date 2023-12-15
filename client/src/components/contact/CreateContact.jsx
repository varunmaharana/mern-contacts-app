import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { API_LINK } from "../../core";
import { FiInfo } from "react-icons/fi";

import tempdp from ".././../assets/dp.jpg";

const CreateContact = () => {
  const { userInfo } = useSelector((state) => state.userInfoReducer);
  const { isAuthenticated } = useSelector(
    (state) => state.isAuthenticatedReducer
  );

  const [namePrefix, setNamePrefix] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nameSuffix, setNameSuffix] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailName, setEmailAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [address, setAddress] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [toggleRedirect, setToggleRedirect] = useState(false);

  const createContact = async (e) => {
    e.preventDefault();

    if (firstName === "") {
      setErrorMessage("First name must not be empty!");
      return;
    }

    const data = new FormData();
    data.append("namePrefix", namePrefix);
    data.append("firstName", firstName);
    data.append("middleName", middleName);
    data.append("lastName", lastName);
    data.append("nameSuffix", nameSuffix);
    data.append("phoneNumber", phoneNumber);
    data.append("emailName", emailName);
    data.append("dateOfBirth", dateOfBirth);
    data.append("address", address);
    data.append("additionalNote", additionalNote);
    data.append("creator", userInfo.id);

    let reqObject = {};
    data.forEach((value, key) => (reqObject[key] = value));
    reqObject = {
      ...reqObject, 
      fullName: firstName + " " + middleName + " " + lastName,
    }

    const response = await fetch(`${API_LINK}/createContact`, {
      method: "POST",
      body: JSON.stringify(reqObject),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    // console.log(await response.json());

    if (response.ok) {
      setToggleRedirect(true);
      console.log(response);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/home" />;
  }

  if (toggleRedirect) {
    return <Navigate to="/home" />;
  }

  return (
    <section id="createContact">
      <div className="container">
        <h1>Create Contact</h1>
        <form onSubmit={createContact}>
          <div className="imageUpload">
            <img src={tempdp} alt="avatar" />
          </div>
          <div className="info">
            <div>
              <label htmlFor="namePrefix">Name Prefix</label>
              <input
                type="text"
                name="namePrefix"
                placeholder="Name Prefix"
                onChange={(e) => setNamePrefix(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="firstName">First Name <sup>*</sup></label>
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errorMessage !== "" && (
                <div className="errMessage">
                  <FiInfo />
                  <p>{errorMessage}</p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="middleName">Middle Name</label>
              <input
                type="text"
                name="middleName"
                placeholder="Middle Name"
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="nameSuffix">Name Suffix</label>
              <input
                type="text"
                name="nameSuffix"
                placeholder="Name Suffix"
                onChange={(e) => setNameSuffix(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                placeholder="Phone Number"
                onChange={(e) => setPhoneNumber(e.target.value + "")}
              />
            </div>

            <div>
              <label htmlFor="emailAddress">Email Address</label>
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address"
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                placeholder="Date of Birth"
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="additionalNote">Note</label>
              <textarea
                type="text"
                name="additionalNote"
                placeholder="Note"
                onChange={(e) => setAdditionalNote(e.target.value)}
              />
            </div>
          </div>

          <div className="submit">
            <input type="submit" value="Create Contact" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default CreateContact;
