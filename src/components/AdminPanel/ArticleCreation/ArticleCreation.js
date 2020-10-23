import React, { useState, useEffect, useMemo } from "react";
import styles from "./ArticleCreation.module.css";
import { useSelector, useDispatch } from "react-redux";
import cross from "../../../assets/cross.svg";
import eye from "../../../assets/eye.svg";
import back from "../../../assets/back.svg";
import cn from "classnames/bind";
import Article from "../../Article/Article.js";
import { addArticle, changeArticle } from "../../../actions/articles.actions.js";
import axios from "../../../utils/axios.utils";
import { useLocation, useHistory } from "react-router-dom";

function ArticleCreation() {

	const history = useHistory();
	const location = useLocation();
	const [article, setArticle] = useState({});
	const [report, setReport] = useState({});
	const dispatch = useDispatch();
	const categories = useSelector(state => state.categories);
	const [title, setTitle] = useState("") ;
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [img, setImg] = useState("");
	const [error, setError] = useState(false);
	const [complete, setComplete] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	
	const addArticleForm = (e) => {
		e.preventDefault();
		const obj = {
			title,
			content,
			image: img ,
			category,
		};

		axios.POST("/articles", obj).then(res => {

			setComplete(true);
			setTitle("");
			setContent("");
			setCategory("");
			setImg("");
			setError(false);
			dispatch(addArticle(res.data.article));

		}).catch(error =>  {
			setError(true);
			console.log(error);
		});
		
	};

	const changeArticleForm  = (e) => {
		e.preventDefault();
		const obj = {
			title,
			content,
			image: img ,
			category,
			_id: article ? article._id : "",
		};

		axios.PUT("/articles", obj).then(()=> {	
			setComplete(true);
			setTitle("");
			setContent("");
			setCategory("");
			setImg("");
			setError(false);
			dispatch(changeArticle(obj));
			console.log(obj);
			const _id = report._id;

			return axios.DELETE("/reports", { _id });

		}).then(() => {
			setReport({});
		})
			.catch(error =>  {
				setError(true);
				console.log(error);
			});
		
	};

	const choiseImg = (e) => {
		let file    = e.target.files[0];
		let reader  = new FileReader();

		reader.onloadend = () => {
			setImg(reader.result);
		};
		reader.readAsDataURL(file);
	};

	const articleMemo = useMemo(() => (
		{
			title,
			content, 
			category,
			image: img,
			createdAt: new Date(),
			isPreview: true,
		}
	), [title, content, category, img]);

	const toBack = () => {
		history.goBack();
	};
	
	useEffect(() => {
		
		if (location.state) {
			const { article, report } = location.state;

			setArticle(article);
			setReport(report);
			setTitle(article.title);
			setContent(article.content);
			setImg(article.image);
			setCategory(article.category);
		}

	},[]);

	return (
		<div className={styles.container}>
			{article.title && <img src={back} onClick={toBack} alt="back-btn" className={styles.back} /> }
			<img src={showPreview ? cross : eye} onClick={() => setShowPreview(!showPreview)} className={ cn(styles.close, { [styles.previewImg]: !showPreview } ) } alt="close-button"  />		
			{!showPreview && <>
				<p className={styles.caption}>{article.title ? "Редактировать новость" : "Добавить новость"}</p>
				<form className={styles.form} onSubmit={article.title ? changeArticleForm : addArticleForm}>
					<textarea value={title} className={styles.title} onChange={(e) => setTitle(e.target.value)} placeholder="заголовок статьи..."/>
					<textarea value={content} className={styles.content} onChange={(e) => setContent(e.target.value)} placeholder="контент..." />
					<input className={styles.picInput} type="file" onChange={choiseImg} />
					<select value={category} className={styles.select} onChange={(e) => setCategory(e.target.value)}>
						{categories && categories.map((elem, i) => (
							<option key={i} >{elem.name}</option>
						))}		
					</select>
					<button className={styles.submitBtn}>{article.title ? "Изменить" : "Добавить"}</button>
					{error && <p className={styles.error}>Все поля должны быть заполнены!</p>}
					{complete && <p className={styles.complete}>{article.title ? "Новость обновлена!" :"Новость добавлена!"}</p>}
				</form>
				{report._id && 
				<div className={styles.report}>
					<p>Выделенный текст: {report.selectedText}</p>
					<p>Комментарий: {report.comment}</p>
				</div>
				}
			</>}		
			{showPreview && <Article article={articleMemo} />}
		</div>
	);
}

export default ArticleCreation;