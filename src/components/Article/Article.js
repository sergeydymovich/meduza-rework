import React  from "react";
import styles from "./Article.module.css";
import { useSelector } from "react-redux";

function Article(props) {

	const newsArr = useSelector(state => state.news.newsArr);
	const id = props.match.params.id;
	const article = newsArr.filter(elem => elem.id === id)[0];
 
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{article.content}</h3>
		</div>
	);
}

export default Article;