import React, { useState }  from "react";
import { declOfNum }  from "../../utils/date.utils.js";
import { filterString }  from "../../utils/string.utils.js";
import styles from "./FeedItem.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import  basket from "../../assets/basket.svg";
import  basketOK from "../../assets/basketOk.svg";
import  change from "../../assets/change.svg";
import axios from "../../utils/axios.utils";

function FeedItem({ article }) {
	const filterWord = useSelector(state => state.filterWord.filterWord);
	const user = useSelector(state => state.user);
	const min = (new Date() - new Date(article.createdAt))/1000/60; 
	const [deleted, setDeleted] = useState(false);

	let filteredArticle = filterWord ? filterString(article.title, filterWord) : "";

	const deleteArticle = (id) => {

		axios.DELETE("/articles", { id }).then(() => {
			setDeleted(true);
			return axios.DELETE("/reports", { articleID: id });
		}).catch(error =>  {
			console.log(error);
		});
	};

	return (
		
		<li className={styles.item} >
			<Link className={styles.link} to={`/articles/${article._id}`} >
				{article.image &&
				<div className={styles.figure}>
					<img className={styles.figureImg} src={article.image} alt="article-img"/>
				</div>
				}
				<div className={styles.itemContent}>
					<p className={styles.category}>{article.category}</p>
					<div className={styles.head}>
						{filterWord.length > 0 ?
							filteredArticle.map((elem, i) => (
								elem.toLowerCase() === filterWord.toLowerCase() ? <strong key={i} className={styles.text}>{elem}</strong> : <React.Fragment key={i}>{elem}</React.Fragment>
							)) 
							:
							<p className={{ [styles.title]: article.image }}>{article.title}</p>
						}
					</div>
					
					<p className={styles.date}>
						{declOfNum(min)}назад 
					</p>
				</div>
			</Link> 
			{!deleted && user.name &&
			<>
				<Link to={{
					pathname: "/admin/articles",
					state: { 
						article: article, 
						report: {},
					}
				}}>
					<img src={change}  alt="change"  className={styles.changeBtn} />
				</Link>			
				<img src={basket} onClick={() => deleteArticle(article._id)} alt="basket" className={styles.deleteBtn} />	
			</>
			}
			{deleted && user.name &&
			<>
				<p className={styles.succesDelete}>Новость удалена!</p>
				<img src={basketOK} alt="basket"  className={styles.deleteBtn} />
			</>
			}	
		</li>
	);
}

export default FeedItem;