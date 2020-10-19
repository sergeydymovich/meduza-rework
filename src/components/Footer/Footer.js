import React from "react";
import styles from "./Footer.module.css";
import { useSelector } from "react-redux";
function Footer() {

	const categories =	useSelector(state => state.contacts);

	return (
		<div className={styles.footer}>
			<div className={styles.container}>
				<p>{categories.phone}</p>
				<p className={styles.email}>{categories.email}</p>
				<p>{categories.adress}</p>		
			</div>
			
		</div>
	);
}

export default Footer;