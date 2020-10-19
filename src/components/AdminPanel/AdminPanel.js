import React, { useEffect } from "react";
import styles from "./AdminPanel.module.css";
import Categories from "./Categories/Categories.js";
import Reports from "./Reports/Reports.js";
import Contacts from "./Contacts/Contacts.js";
import ArticleCreation from "./ArticleCreation/ArticleCreation.js";
import { BrowserRouter as Route,	Link, Switch } from "react-router-dom";
import axios from "../../utils/axios.utils";
import { useDispatch } from "react-redux";
import { getCategories } from "../../actions/categories.actions.js";

function AdminPanel() {

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
				<Switch>
					<Route exact  path="/admin/articles">
						<ArticleCreation  />
					</Route>
					<Route path="/admin/categories">
						<Categories />
					</Route>
					<Route path="/admin/reports">
						<Reports />
					</Route>
					<Route path="/admin/contacts">
						<Contacts />
					</Route>
				</Switch>
				
			</div>
		</div>
	);
}

export default AdminPanel;