import React, { useEffect } from "react";
import styles from "./AdminPanel.module.css";
import { Link } from "react-router-dom";
import axios from "../../utils/axios.utils";
import { useDispatch } from "react-redux";
import { getCategories } from "../../actions/categories.actions.js";

function AdminPanel(props) {
	const dispatch = useDispatch();
	
	useEffect(() => {
		axios.GET("/categories").then(response => {	
			const { categories } = response.data;

			dispatch(getCategories(categories));			
		}).catch(error =>  {
			console.log(error);
		});
	}, []);

	return (
		<div className={styles.adminPage}>
			<div className={styles.panel}>
				<ul className={styles.nav}>
					<Link to="/admin/articles">
						<li className={styles.navItem}>Новости</li>
					</Link>
					<Link to="/admin/categories">
						<li className={styles.navItem}>Категории</li>
					</Link>
					<Link to="/admin/reports">
						<li className={styles.navItem}>Замечания</li>
					</Link>
					<Link to="/admin/contacts">
						<li className={styles.navItem}>Контакты</li>
					</Link>			
				</ul>
			</div>
			<div className={styles.content}>
				{props.children}				
			</div>
		</div>
	);
}

export default AdminPanel;