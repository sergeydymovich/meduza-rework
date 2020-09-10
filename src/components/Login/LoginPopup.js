import React, { useState, useEffect } from "react";
import styles from "./LoginPopup.module.css";
import cross from "../../assets/cross.svg";
import cn from "classnames/bind";
import { logIn } from "../../actions/news.actions.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

function LoginPopup(props)  {
	
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(true);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(true);
			
	const onSubmit = (e) => {

		e.preventDefault();
		const isValid = validate();

		if (isValid) {
			dispatch(logIn());
			props.show();
			history.push("/admin/news");
		} 
	};

	const validate = () => {
		let isValid = true;
		const re = /\S+@\S+\.\S+/;

		if (!re.test(email)) {
			setValidEmail(false);
			isValid = false;
		} 
		if (password.length < 6) {
			setValidPassword(false);
			isValid = false;
		}
		if (!validEmail || !validPassword || !re.test(email) || password.length < 6) {
			isValid = false;
		} 

		return isValid;
	};

	const changeEmail = (e) => {
		setValidEmail(true);
		setEmail(e.target.value);
	};

	const changePassword = (e) => {
		setValidPassword(true);
		setPassword(e.target.value);
	};

	useEffect(() => {
		document.documentElement.style.overflow = "hidden";
		return () => {
			document.documentElement.style.overflow = "visible";
		};
	}, []);

	return (
		<div className={styles.popup}>
			<form className={styles.content} onSubmit={onSubmit}>
				<label className={styles.popupLabel}>Email:</label>
				<input name="email" className={ cn(styles.popupInput, { [styles.error]: !validEmail } ) }  onChange={changeEmail}></input>
				{!validEmail && <strong>введите корректный email!</strong>}
				<label className={styles.popupLabel}>Password</label>
				<input name="password" className={ cn(styles.popupInput, { [styles.error]: !validPassword } )} type="text" onChange={changePassword}></input>
				{!validPassword && <strong>введите корректный пароль!</strong>}
				<button className={styles.submitBtn}>Отправить</button>
				<img src={cross} className={styles.close} alt="close-button" onClick={props.closePopup} />
			</form>
		</div>
	); 
}

export default LoginPopup;