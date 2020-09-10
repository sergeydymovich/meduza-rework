import React from "react";
import styles from "./NewsFeed.module.css";
import NewsItem from "../NewsItem/NewsItem.js";
import { useSelector } from "react-redux";

function NewsFeed() {
	
	const newsArr =	useSelector(state => state.news.newsArr);
	const filteredArr =	useSelector(state => state.news.filteredArr);
	const filterWord =	useSelector(state => state.news.filterWord);
	const news = filteredArr.length > 0 || filterWord  ? filteredArr : newsArr;

	return (
		<div className={styles.content}>
			{!filteredArr.length && filterWord && <strong>НИЧЕГО НЕ НАЙДЕНО...</strong>}
			<ul className={styles.news}>
				{news.map( (elem, i) => (
					<NewsItem
						key={i}
						content={elem.content}
						time={elem.date}
						id={elem.id}
					/>
				))}
			</ul>
		</div>
	);
}

export default NewsFeed;