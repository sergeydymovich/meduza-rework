import React  from "react";
import { declOfNum }  from "../../utils/date.utils.js";
import { filterString }  from "../../utils/string.utils.js";
import styles from "./NewsItem.module.css";
import { useSelector, useDispatch } from "react-redux";
import { selectArticle } from "../../actions/news.actions.js";
import { useHistory } from "react-router-dom";

function NewsItem(props) {

	const history = useHistory();
	const dispatch = useDispatch();
	const filterWord = useSelector(state => state.news.filterWord);
	const min = (new Date() - props.time)/1000/60; 
	let filteredArr = filterWord ? filterString(props.content, filterWord) : "";

	const changeArticle = () => {
		dispatch(selectArticle(props.id));
		history.push(`/${props.id}`);
	};

	return (
		<li className={styles.item} onClick={changeArticle} >
			{filterWord.length > 0 ?
				filteredArr.map((elem, i) => (
					elem === filterWord ? <strong key={i} className={styles.text}>{elem}</strong> : <React.Fragment key={i}>{elem}</React.Fragment>
				)) 
				:
				props.content
			}
			<p className={styles.date}>
				{declOfNum(min)}назад 
			</p>
		</li>
	);
}

export default NewsItem;