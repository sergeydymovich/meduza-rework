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
	Redirect
} from "react-router-dom";

function App() {

	const isAdmin = useSelector(state => state.news.isAdmin);
	const activeArticle = useSelector(state => state.news.activeArticle);

	return (
		<Router>	
			<div className={styles.App}>
				{!isAdmin && <Redirect exact from="/admin" to="/" />}
				<Header isAdmin={isAdmin} />
				<Switch>
					<Route exact path="/">		
						<NewsFeed />
					</Route>
					{activeArticle && <Route path={"/"+activeArticle} component={Article}></Route> }
					
					{isAdmin && <Route path="/admin" component={AdminPanel} />}
				</Switch>			
			</div>
		</Router>	
	);
}

export default App;