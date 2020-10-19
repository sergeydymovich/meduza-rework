import React, { useEffect } from "react";
import styles from "./App.module.css";
import Header from "../Header/Header.js";
import Footer from "../Footer/Footer.js";
import Feed from "../Feed/Feed.js";
import AdminPanel from "../AdminPanel/AdminPanel.js";
import Registration from "../Registration/Registration.js";
import LoginPopup from "../Login/LoginPopup.js";
import { login } from "../../actions/user.actions.js";
import { getArticles } from "../../actions/articles.actions.js";
import ArticleContainer from "../Article/ArticleContainer.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios.utils";

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

function App() {
	const dispatch = useDispatch();
	const articlesCount = useSelector(state => state.articles).length;
	
	useEffect(() => {
		
		const name = localStorage.getItem("name") || "";
		const token = localStorage.getItem("token") || "";

		dispatch(login(name, token));

		axios.GET(`/articles?limit=7&offset=${articlesCount}`).then(response => {	
			dispatch(getArticles(response.data.articles)); 				
		}).catch(error =>  {
			console.log(error);

		});
			
	}, []);

	return (
		<Router>	
			<div className={styles.App}>
				<Header />
				<Switch>
					<Route exact path="/" component={Feed} />			
					<Route path="/articles/:id" component={ArticleContainer} />				
					<Route path="/admin" component={AdminPanel} />
					<Route path="/registration" component={Registration} />
					<Route path="/login" component={LoginPopup} />
				</Switch>	
				<Footer />		
			</div>
		</Router>	
	);
}

export default App;