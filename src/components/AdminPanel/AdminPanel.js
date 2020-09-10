import React from "react";
import styles from "./AdminPanel.module.css";
import Categories from "./Categories/Categories.js";
import { BrowserRouter as Route,	Link, Switch } from "react-router-dom";
function AdminPanel() {

	return (
		<div className={styles.adminPage}>
			<div className={styles.panel}>
				<ul className={styles.nav}>
					<Link to="/admin/news">
						<li className={styles.navItem}>Новости</li>
					</Link>
					<Link to="/admin/categories">
						<li className={styles.navItem}>Категории</li>
					</Link>
					<Link to="/admin/remarks">
						<li className={styles.navItem}>Замечания</li>
					</Link>
					<Link to="/admin/contacts">
						<li className={styles.navItem}>Контакты</li>
					</Link>			
				</ul>
			</div>
			<div className={styles.content}>
				<Switch>
					<Route path="/admin/news">
						<div>Новости</div>
					</Route>
					<Route path="/admin/categories">
						<Categories />
					</Route>
					<Route path="/admin/remarks">
						<div>Замечания</div>
					</Route>
					<Route path="/admin/contacts">
						<div>Контакты</div>
					</Route>
				</Switch>
				
			</div>
		</div>
	);
}

export default AdminPanel;