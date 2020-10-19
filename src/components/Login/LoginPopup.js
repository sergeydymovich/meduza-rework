import React, { useState, useEffect } from "react";
import styles from "./LoginPopup.module.css";
import cross from "../../assets/cross.svg";
import cn from "classnames/bind";
import { login } from "../../actions/user.actions.js";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios.utils";
import { Link } from "react-router-dom";

function LoginPopup()  {
	
	const history = useHistory();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const onSubmit = (e) => {
		e.preventDefault();
		const user = {
			email,
			password
		};

		axios.POST("/signin", user).then(response => {
			const { name, token } = response.data;

			dispatch(login(name, token));
			history.push("/");
			localStorage.setItem("name",	name );
			localStorage.setItem("token",	token );
			
		}).catch(() =>  {
			setError(true);
		});

	};

	const changeEmail = (e) => {
		setEmail(e.target.value);
		setError(false);
	};

	const changePassword = (e) => {
		setPassword(e.target.value);
		setError(false);
	};

	useEffect(() => {
		const token = localStorage.getItem("token") || "";

		if (token) {
			history.push("/");
		}
		document.documentElement.style.overflow = "hidden";
		return () => {
			document.documentElement.style.overflow = "visible";
		};
	}, []);

	return (
		<div className={styles.popup}>	
			<form className={styles.content} onSubmit={onSubmit}>
				<Link to="/">
					<img src={cross} className={styles.close} alt="close-button" />
				</Link>	
				<label className={styles.popupLabel}>Email:</label>
				<input name="email" className={ cn(styles.popupInput, { [styles.error]: error } ) }  onChange={changeEmail}></input>
				<label className={styles.popupLabel}>Password</label>
				<input name="password" className={ cn(styles.popupInput, { [styles.error]: error } )} type="text" onChange={changePassword}></input>
				{error && <strong>неверное имя пользователя или пароль!</strong>}
				<button className={styles.submitBtn}>Отправить</button>
				<Link to="/registration">
					<p>Зарегистрироваться</p>
				</Link>
			</form>		
		</div>			
	); 
}

export default LoginPopup;