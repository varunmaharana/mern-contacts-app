import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Navigate, useParams } from "react-router-dom";
import { API_LINK } from "../../core";
import {
	MdPerson,
	MdPhone,
	MdLocationOn,
	MdEmail,
	MdCake,
	MdNote,
	MdMoreHoriz,
	MdClose,
	MdEdit,
	MdDelete,
	MdArrowBack,
} from "react-icons/md";
import { motion } from "framer-motion";
import Loader from "../layout/Loader";

import tempdp from ".././../assets/dp.jpg";

const formatDate = (date) => {
	const dateObject = new Date(date);

	const year = dateObject.getFullYear();
	const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
	const day = dateObject.getDate().toString().padStart(2, "0");

	const formattedDate = `${day}-${month}-${year}`;

	return formattedDate;
};

const ViewContact = () => {
	const { id } = useParams();
	const { isAuthenticated } = useSelector(
		(state) => state.isAuthenticatedReducer
	);

	const { userInfo } = useSelector((state) => state.userInfoReducer);

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

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

	const [isFetched, setIsFetched] = useState(false);
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
			response.json().then(({ success, contactInfo }) => {
				if (success) {
					setIsFetched((prev) => (prev = !prev));
				}
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

	const deleteContact = async (contactId) => {
		await fetch(`${API_LINK}/deleteContact`, {
			method: "DELETE",
			body: JSON.stringify({ id: contactId }),
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		}).then((response) => {
			response.json().then((res) => {
				console.log(res);
				if (res.success) {
					console.log("navigate to home after delete");
					backToPrevPage();
				}
			});
		});
	};

  const backToPrevPage = () => {
    window.history.back();
  };

	return (
		<section id="viewContact">
			{isFetched ? (
				<Loader />
			) : (
				<div className="container">
					{/* <button>Edit</button>
					<button>Delete</button> */}
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
						<NavLink to={`/contact/${id}/edit`}>
							<motion.button
								initial={{ y: "-100%" }}
								whileInView={{ y: 0 }}
								className="editButton"
							>
								<MdEdit />
								{"Edit "}
							</motion.button>
						</NavLink>
						<motion.button
							initial={{ x: "100%" }}
							whileInView={{ x: 0 }}
							className="deleteButton"
							onClick={() => {
								deleteContact(id);
							}}
						>
							<MdDelete />
							{"Delete"}
						</motion.button>
					</div>

					<div className="contactInfoCard">
						<div className="contactImage">
							<img src={tempdp} alt="avatar" />
						</div>
						<div className="info">
							<h3 className="fullName">
								<MdPerson />
								{namePrefix && (
									<span className="namePrefix">
										{namePrefix}{" "}
									</span>
								)}
								{firstName && (
									<span className="firstName">
										{firstName}{" "}
									</span>
								)}
								{middleName && (
									<span className="middleName">
										{middleName}{" "}
									</span>
								)}
								{lastName && (
									<span className="lastName">{lastName}</span>
								)}
								{nameSuffix && (
									<span className="nameSuffix">
										, {nameSuffix}
									</span>
								)}
							</h3>
							{phoneNumber && (
								<p className="phoneNumber">
									<MdPhone />
									&nbsp;{phoneNumber}
								</p>
							)}
							{emailAddress && (
								<p className="emailAddress">
									<MdEmail />
									&nbsp;{emailAddress}
								</p>
							)}
							{dateOfBirth && (
								<p className="dateOfBirth">
									<MdCake />
									&nbsp;{formatDate(dateOfBirth)}
								</p>
							)}
							{address && (
								<p className="address">
									<MdLocationOn />
									&nbsp;{address}
								</p>
							)}
							{additionalNote && (
								<p className="additionalNote">
									<MdNote />
									&nbsp;{additionalNote}
								</p>
							)}
						</div>
					</div>
				</div>
			)}
			{/* {isFetched && <Loader />} */}
		</section>
	);
};

export default ViewContact;
