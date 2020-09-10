import React from "react";
import styles from "./App.module.css";
import Header from "../Header/Header.js";
import NewsFeed from "../NewsFeed/NewsFeed.js";
import AdminPanel from "../AdminPanel/AdminPanel.js";
import Article from "../Article/Article.js";
import { useSelector } from "react-redux";
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

function App() {

	const isAdmin = useSelector(state => state.news.isAdmin);

	return (
		<Router>	
			<div className={styles.App}>
				<Header isAdmin={isAdmin} />
				<Switch>
					<Route exact path="/" component={NewsFeed} />				
					<Route path={"/news/:id"} component={Article} />				
					{isAdmin && <Route path="/admin" component={AdminPanel} />}
				</Switch>			
			</div>
		</Router>	
	);
}

export default App;