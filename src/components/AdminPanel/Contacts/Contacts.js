import React, { useState } from "react";
import styles from "./Contacts.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeContacts } from "../../../actions/contacts.actions.js";
import cn from "classnames";

function Contacts() {

	const dispatch = useDispatch();
	const contacts =	useSelector(state => state.contacts);
	const [phone, setPhone] = useState(contacts.phone);
	const [email, setEmail] = useState(contacts.email);
	const [adress, setAdress] = useState(contacts.adress);
	const [validEmail, setValidEmail] = useState(true);

	const submitForm = (e) => {
		e.preventDefault();
		const re = /\S+@\S+\.\S+/;

		if (!re.test(email)) {
			setValidEmail(false);		
		} else {
			dispatch(changeContacts(phone, email, adress));
		}
				
	};
	const changeEmail = (e) => {
		setEmail(e.target.value);
		setValidEmail(true);
	};

	return (
		<div className={styles.container}>
			<p className={styles.title}>Редактировать Контакты</p>
			<form className={styles.form} onSubmit={submitForm}>
				<label className={styles.label}>Телефон:</label>
				<input value={phone} className={styles.input} type="text" onChange={(e) => setPhone(e.target.value)} />
				<label className={styles.label}>Email:</label>
				<input value={email} className={ cn(styles.input, { [styles.inputError]: !validEmail })} type="text" onChange={changeEmail} />
				{!validEmail && <p className={styles.error}>некорректный email!</p>}
				<label className={styles.label}>Адрес:</label>
				<input value={adress} className={styles.input} type="text" onChange={(e) => setAdress(e.target.value)} />
				<button className={styles.btn}>Изменить</button>
			</form>
			
		</div>
	);
}

export default Contacts;