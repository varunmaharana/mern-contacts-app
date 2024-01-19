import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ContactCard from "../contact/ContactCard";
import { API_LINK } from "../../core";
import Loader from "../layout/Loader";

const Home = () => {
	const { isAuthenticated } = useSelector(
		(state) => state.isAuthenticatedReducer
	);

	const { userInfo } = useSelector((state) => state.userInfoReducer);
	// console.log("User Info:", userInfo);

	const [allUserContacts, setAllUserContacts] = useState([]);

	// Main API Call
	useEffect(() => {
		fetchContacts();
	}, []);

	const fetchContacts = async () => {
		await fetch(`${API_LINK}/getAllUserContacts?userId=${userInfo.id}`, {
			method: "GET",
			credentials: "include",
			headers: { "Content-Type": "application/json" },
		}).then((response) => {
			response.json().then((contacts) => {
				setAllUserContacts(contacts.contacts);
			});
		});
	};

	if (!isAuthenticated) {
		return <Navigate to="/login" />;
	}

	return (
		<section id="home">
			<div className="container">
				{allUserContacts.length > 0 &&
					allUserContacts.map((contact, index) => {
						return (
							<ContactCard
								key={contact._id}
								id={contact._id}
								namePrefix={contact.namePrefix}
								firstName={contact.firstName}
								middleName={contact.middleName}
								lastName={contact.lastName}
								nameSuffix={contact.nameSuffix}
								phoneNumber={contact.phoneNumber}
								emailAddress={contact.emailAddress}
								address={contact.address}
                fetchContacts={fetchContacts}
							/>
						);
					})}

				{allUserContacts.length === 0 && <Loader />}
			</div>
		</section>
	);
};

export default Home;
