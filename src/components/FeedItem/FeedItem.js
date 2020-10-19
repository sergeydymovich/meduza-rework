import React, { useState }  from "react";
import { declOfNum }  from "../../utils/date.utils.js";
import { filterString }  from "../../utils/string.utils.js";
import styles from "./FeedItem.module.css";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import  basket from "../../assets/basket.svg";
import  basketOK from "../../assets/basketOk.svg";
import  change from "../../assets/change.svg";
import ArticleChange from "../AdminPanel/ArticleCreation/ArticleCreation.js";
import axios from "../../utils/axios.utils";

function FeedItem(props) {

	const filterWord = useSelector(state => state.filterWord.filterWord);
	const user = useSelector(state => state.user);
	const min = (new Date() - new Date(props.createdAt))/1000/60; 
	const [deleted, setDeleted] = useState(false);
	const [showChangeForm, setShowChangeForm] = useState(false);

	let filteredArticle = filterWord ? filterString(props.title, filterWord) : "";

	const deleteArticle = (id) => {

		axios.DELETE("/articles", { id }).then(() => {
			setDeleted(true);
		}).catch(error =>  {
			console.log(error);
		});
	};

	return (
		
		<li className={styles.item} >
			<NavLink className={styles.link} to={`/articles/${props.id}`} >
				{props.image &&
				<div className={styles.figure}>
					<img className={styles.figureImg} src={props.image} alt="article-img"/>
				</div>
				}
				<div className={styles.itemContent}>
					<p className={styles.category}>{props.category}</p>
					<div className={styles.head}>
						{filterWord.length > 0 ?
							filteredArticle.map((elem, i) => (
								elem.toLowerCase() === filterWord.toLowerCase() ? <strong key={i} className={styles.text}>{elem}</strong> : <React.Fragment key={i}>{elem}</React.Fragment>
							)) 
							:
							<p className={{ [styles.title]: props.image }}>{props.title}</p>
						}
					</div>
					
					<p className={styles.date}>
						{declOfNum(min)}назад 
					</p>
				</div>
			</NavLink> 
			{!deleted && user.name &&
			<>
				<img src={change} onClick={() => setShowChangeForm(true)} alt="change"  className={styles.changeBtn} />
				<img src={basket} onClick={() => deleteArticle(props.id)} alt="basket" className={styles.deleteBtn} />	
			</>
			}
			{deleted && user.name &&
			<>
				<p className={styles.succesDelete}>Новость удалена!</p>
				<img src={basketOK} alt="basket"  className={styles.deleteBtn} />
			</>
			}
			{showChangeForm && user.name && 
			<div className={styles.article}>
				<div className={styles.change}>			
					<ArticleChange setShowChangeForm={setShowChangeForm} {...props} />
				</div>
				
			</div>
			}		
		</li>
	);
}

export default FeedItem;