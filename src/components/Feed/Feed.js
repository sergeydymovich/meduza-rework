import React, { useState, useEffect } from "react";
import styles from "./Feed.module.css";
import FeedItem from "../FeedItem/FeedItem.js";
import Loader from "../Loader/Loader.js";
import { arrModify }  from "../../utils/arrModify.utils.js";
import { useSelector, useDispatch } from "react-redux";
import { getArticles } from "../../actions/articles.actions.js";
import axios from "../../utils/axios.utils";

function Feed() {

	const dispatch = useDispatch();
	const articlesState = useSelector(state => state.articles);
	const [articlesCurrentAmount, setArticlesCurrentAmount] = useState(0); 
	const [articles, setArticles] = useState([]);
	const [days, setDays] = useState([]);
	const [isLoading, setIsloading] = useState(false);
	const [articlesTotalAmount, setArticlesTotalAmount] = useState(null);
	const [noArticles, setNoArticles] = useState(false);
	
	useEffect(() => {	

		setArticlesCurrentAmount(articlesState.length);

		if (articlesState.length === 0) {
			setIsloading(true);
		} else {
			setIsloading(false);
		}

		if (articlesTotalAmount && articlesState.length >= articlesTotalAmount) {
			setNoArticles(true);
		}
		
		const [articles, days] = arrModify(articlesState);
						
		setArticles(articles);
		setDays(days);
		
	},[articlesState]);

	const getMoreArticles = () => {
		axios.GET(`/articles?limit=7&offset=${articlesCurrentAmount}`).then(res => {	
			dispatch(getArticles(res.data.articles)); 

			setArticlesTotalAmount(res.data.count);
								
		}).catch(error =>  {
			console.log(error);
		});

	};

	return (
		<>
			<div className={styles.articlesFeed}>	
				{days.map((day, i) => (
					<div key={day} className={styles.content}>
						<h2 className={styles.title}>{day}</h2>
						<ul className={styles.articles}>
							{articles[i][day].map( (article) => (
								<FeedItem
									key={article._id}
									title={article.title}
									createdAt={article.createdAt}
									id={article._id}
									category={article.category}
									image={article.image}
									content={article.content}
								/>
							))}
						</ul>					
					</div>
				))
				}
				{isLoading &&
				<div className={styles.loaderContainer}>
					<Loader />	
				</div>			
				}
				{!noArticles && articlesCurrentAmount && <button className={styles.loadBtn} onClick={getMoreArticles}>показать еще</button>}
			</div>
		</>
	);
}

export default Feed;
	
