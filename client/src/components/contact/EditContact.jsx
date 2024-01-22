import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink, Navigate, useParams } from "react-router-dom";
import { API_LINK } from "../../core";
import { FiInfo } from "react-icons/fi";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { MdArrowBack } from "react-icons/md";

import tempdp from ".././../assets/dp.jpg";

const formatDate = (date) => {
	const dateObject = new Date(date);

	const year = dateObject.getFullYear();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
	const day = dateObject.getDate().toString().padStart(2, "0");

	const formattedDate = `${year}-${month}-${day}`;

	return formattedDate;
};

const EditContact = () => {
	const { id } = useParams();
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
	const [emailAddress, setEmailAddress] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState("");
	const [address, setAddress] = useState("");
	const [additionalNote, setAdditionalNote] = useState("");
	const [errorMessage, setErrorMessage] = useState("");
	const [toggleRedirect, setToggleRedirect] = useState(false);

	useEffect(() => {
		fetchContact();
	}, []);

	const fetchContact = async () => {
		await fetch(`${API_LINK}/getContactInfo?contactId=${id}`, {
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		}).then(async (response) => {
			response.json().then(({ contactInfo }) => {
				setNamePrefix(contactInfo.namePrefix);
				setFirstName(contactInfo.firstName);
				setMiddleName(contactInfo.middleName);
				setLastName(contactInfo.lastName);
				setNameSuffix(contactInfo.nameSuffix);
				setPhoneNumber(contactInfo.phoneNumber);
				setEmailAddress(contactInfo.emailAddress);
				setDateOfBirth(contactInfo.dateOfBirth);
				setAddress(contactInfo.address);
				setAdditionalNote(contactInfo.additionalNote);
			});
		});
	};

	const updateContact = async (e) => {
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
		data.append("emailAddress", emailAddress);
		data.append("dateOfBirth", dateOfBirth);
		data.append("address", address);
		data.append("additionalNote", additionalNote);
		data.append("creator", userInfo.id);

		let reqObject = {};
		data.forEach((value, key) => (reqObject[key] = value));
		// reqObject = {
		//   ...reqObject,
		//   fullName: namePrefix + firstName + middleName + lastName + nameSuffix,
		// }

		const response = await fetch(
			`${API_LINK}/updateUserContactInfo?contactId=${id}`,
			{
				method: "PUT",
				body: JSON.stringify(reqObject),
				credentials: "include",
				headers: { "Content-Type": "application/json" },
			}
		);
		// console.log(await response.json());

		if (response.ok) {
			setToggleRedirect(true);
			toast.success("Contact updated successfully!");
			console.log(response);
		}
	};

	if (!isAuthenticated) {
		return <Navigate to="/home" />;
	}

	if (toggleRedirect) {
		return <Navigate to={"/contact/" + id} />;
	}

	return (
		<section id="editContact">
			<div className="container">
				<div className="optionsButtons">
					<motion.button
						initial={{ x: "-100%" }}
						whileInView={{ x: 0 }}
						className="backButton"
						onClick={() => {
							backToPrevPage();
						}}
					>
						<MdArrowBack />
						{"Back"}
					</motion.button>
				</div>
				<h1>Edit Contact</h1>
				<form onSubmit={updateContact}>
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
								value={namePrefix || ""}
								onChange={(e) => setNamePrefix(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="firstName">
								First Name <sup>*</sup>
							</label>
							<input
								type="text"
								name="firstName"
								placeholder="First name"
								value={firstName || ""}
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
								value={middleName || ""}
								onChange={(e) => setMiddleName(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="lastName">Last Name</label>
							<input
								type="text"
								name="lastName"
								placeholder="Last Name"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="nameSuffix">Name Suffix</label>
							<input
								type="text"
								name="nameSuffix"
								placeholder="Name Suffix"
								value={nameSuffix || ""}
								onChange={(e) => setNameSuffix(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="phoneNumber">Phone Number</label>
							<input
								type="number"
								name="phoneNumber"
								placeholder="Phone Number"
								value={phoneNumber || ""}
								onChange={(e) =>
									setPhoneNumber(e.target.value + "")
								}
							/>
						</div>

						<div>
							<label htmlFor="emailAddress">Email Address</label>
							<input
								type="email"
								name="emailAddress"
								placeholder="Email Address"
								value={emailAddress || ""}
								onChange={(e) =>
									setEmailAddress(e.target.value)
								}
							/>
						</div>

						<div>
							<label htmlFor="dateOfBirth">Date of Birth</label>
							<input
								type="date"
								name="dateOfBirth"
								placeholder="Date of Birth"
								value={formatDate(dateOfBirth)}
								onChange={(e) => setDateOfBirth(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="address">Address</label>
							<textarea
								type="text"
								name="address"
								placeholder="Address"
								value={address || ""}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</div>

						<div>
							<label htmlFor="additionalNote">Note</label>
							<textarea
								type="text"
								name="additionalNote"
								placeholder="Note"
								value={additionalNote || ""}
								onChange={(e) =>
									setAdditionalNote(e.target.value)
								}
							/>
						</div>
					</div>

					<div className="submit">
						<NavLink to={"/contact" + id}>
							<input type="button" value="Cancel" />
						</NavLink>
						<input type="submit" value="Save Changes" />
					</div>
				</form>
			</div>
		</section>
	);
};

export default EditContact;
