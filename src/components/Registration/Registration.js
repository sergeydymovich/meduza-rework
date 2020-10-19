import React, { useState, useEffect } from "react";
import styles from "../Login/LoginPopup.module.css";
import cross from "../../assets/cross.svg";
import axios from "../../utils/axios.utils";
import cn from "classnames/bind";
import { useDispatch } from "react-redux";
import { login } from "../../actions/user.actions.js";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function Registration()  {
	
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(true);
	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(true);
	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(true);
	const [succes, setSucces] = useState(true);

	const registerUser = (e) => {
		e.preventDefault();
		const isValid = validate();
		const user = {
			name: username,
			password: password,
			email: email,
		};

		if (isValid){
			axios.POST("/signup", user).then(response => {
				const { name, token } = response.data;
	
				history.push("/");
				dispatch(login(name, token));
				localStorage.setItem("name",	name );
				localStorage.setItem("token",	token );
			}).catch(() =>  {
				setSucces(false);
			});
		}
	};

	const validate = () => {
		let isValid = true;
		const re = /\S+@\S+\.\S+/;

		if (password.length < 5) {
			setValidPassword(false);
			isValid = false;
		}
		if (username.length < 4) {
			setValidUsername(false);
			isValid = false;
		}

		if (!re.test(email)) {
			setValidEmail(false);
			isValid = false;
		}
		
		return isValid;
	};

	const changeUsername = (e) => {
		setUsername(e.target.value);
		setValidUsername(true);
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
		const token = localStorage.getItem("token") || "";

		if (token) {
			history.push("/");
		}

	}, []);

	return (
		<div className={styles.popup}>	
			<form className={styles.content} onSubmit={registerUser}>
				<Link to="/">
					<img src={cross} className={styles.close} alt="close-button" />
				</Link>			
				<label className={styles.popupLabel}>Имя</label>
				<input name="name" className={ cn(styles.popupInput, { [styles.error]: !validUsername } ) }  onChange={changeUsername}></input>
				{!validUsername && <p>имя дожно содержать не менее 4 символов</p>}
				<label className={styles.popupLabel}>Email:</label>
				<input name="email" className={ cn(styles.popupInput, { [styles.error]: !validEmail } ) }  onChange={changeEmail}></input>
				{!validEmail && <p>некорректный email</p>}
				<label className={styles.popupLabel}>Password</label>
				<input name="password" className={ cn(styles.popupInput, { [styles.error]: !validPassword } )} type="text" onChange={changePassword}></input>
				{!validPassword && <p>пароль должен содержать не менее 5 символов</p>}
				<button className={styles.submitBtn}>register</button>
				{!succes && <p>ошибка</p>}
			</form>
		</div>
	); 
}

export default Registration;