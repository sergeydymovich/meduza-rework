import React, { useEffect, useState }  from "react";
import { useSelector, useDispatch } from "react-redux";
import Article from "./Article.js";
import axios from "../../utils/axios.utils";
import { getArticles } from "../../actions/articles.actions.js";
import Loader from "../Loader/Loader.js";
import styles from "./Article.module.css";
import { useParams } from "react-router-dom";

function ArticleContainer() {

	const{ id } = useParams();
	const dispatch = useDispatch();
	const article = useSelector(state => state.articles.find(el => el._id === id));	
	const [isLoading, setIsLoading] = useState(false);
	const [isFound, setIsFound] = useState(true);

	useEffect(() => {
		if (!article) {
		
			setIsLoading(true);
			axios.GET(`/articles?id=${id}`).then(response => {	
				dispatch(getArticles(response.data.articles));
				setIsLoading(false); 			
			}).catch(error =>  {
				setIsLoading(false);
				console.log(error);
				setIsFound(false);
			});
				
		}
	}, [article]);

	return (
		<>
			{article && <Article article={article} />}
			{isLoading && <div className={styles.loader}><Loader/></div>}
			{!isFound && <p className={styles.notFound}>Такой новости не существует :(</p>}
		</>
	);
}

export default ArticleContainer;