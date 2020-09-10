import React, { useState } from "react";
import styles from "./Header.module.css";
import { useDispatch } from "react-redux";
import { filterNews } from "../../actions/news.actions.js";
import LoginPopup from "../Login/LoginPopup.js";
import god from "../../assets/god.svg";

function Header(props) {

	const dispatch = useDispatch();
	const [showPopup, setShowPopup] = useState(false);
	const { isAdmin } = props;
	const closePopup = () => {
		setShowPopup(false);
	};

	const toFilterNews = (e) => {
		dispatch(filterNews(e.target.value));
	};

	return (
		<div className={styles.header}>
			<h1 className={styles.title}>DYMOVICH NEWS</h1>
			{!isAdmin &&
					<div className="header-input">
						<input type="text" className={styles.search} onChange={toFilterNews} placeholder="Search news.." />
						<button className={styles.loginBtn}  onClick={() => setShowPopup(true)} >Log in</button>
						{showPopup && <LoginPopup closePopup={closePopup} show={setShowPopup} /> }
					</div>}
			{isAdmin && 
			<div className={styles.admin}>
				<img src={god} className={styles.god} alt="admin-img"/>
				<p className={styles.adminText}>ADMIN</p>
			</div>}    
		</div>
	);
}

export default Header;