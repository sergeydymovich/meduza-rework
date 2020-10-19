import React, { useState }  from "react";
import styles from "./Article.module.css";
import cross from "../../assets/cross.svg";
import { Link } from "react-router-dom";
import { format } from  "date-fns";
import ruLocale from "date-fns/locale/ru";
import axios from "../../utils/axios.utils";
import { deleteArticle } from "../../actions/articles.actions.js";
import { useDispatch } from "react-redux";

function Article({ article }) {
	console.log(article);
	const dispatch = useDispatch();
	const [selectedText, setSelectedText] = useState("");
	const [report, setReport] = useState(false);
	const [reportText, setReportText] = useState("");
	const propsDate = new Date(article.createdAt);
	const date = format(
		propsDate,
		"HH:mm, d MMMM yyyy",
		{ 
			addSuffix: true,
			locale: ruLocale,
		}

	);

	const keyDown = (e) => {
		if (e.keyCode === 69 && e.shiftKey) {
			setReport(true);
			setSelectedText(window.getSelection().toString());
		}
	};

	const submitReport = (e) => {
		e.preventDefault();
		const obj = {
			_id: article._id,
			selectedText,
			comment: reportText,
		};

		axios.POST("/reports", obj).then(() => {

			setReport(false);
		}).catch(() =>  {
			console.log("серверная ошибка");
		});
		
	};

	return (
		<div className={styles.container} tabIndex="10"  onKeyDown={keyDown} >
			{!article.isPreview && 
				<Link to="/">
					<img src={cross} className={styles.close} alt="close-button"  />
				</Link>
			}
			<p className={styles.category}>{article.category}</p>
			<h3 className={styles.title}>{article.title}</h3>
			<p className={styles.date}>{date}</p>
			{article.image && <img className={styles.image} src={article.image} alt="ima"/>}
			<p className={styles.content} >{article.content}</p>
			{report && 
			<form className={styles.reportForm} onSubmit={submitReport}>
				<p className={styles.reportTitle}>Сообщить об ошибке</p>
				<input className={styles.reportInput} onChange={(e) => setReportText(e.target.value)} type="text"/>
				<button className={styles.reportBtn}>Отправить</button>
			</form>
			}
		</div>
	);
}

export default Article;