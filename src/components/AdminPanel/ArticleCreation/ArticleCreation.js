import React, { useState } from "react";
import styles from "./ArticleCreation.module.css";
import { useSelector, useDispatch } from "react-redux";
import cross from "../../../assets/cross.svg";
import eye from "../../../assets/eye.svg";
import back from "../../../assets/back.svg";
import cn from "classnames/bind";
import Article from "../../Article/Article.js";
import { addArticle, changeArticle } from "../../../actions/articles.actions.js";
import axios from "../../../utils/axios.utils";

function ArticleCreation(props) {

	const dispatch = useDispatch();
	const categories = useSelector(state => state.categories);
	// const user = useSelector(state => state.user);
	const [title, setTitle] = useState(props.title || "") ;
	const [content, setContent] = useState(props.content || "");
	const [category, setCategory] = useState(props.category || "");
	const [img, setImg] = useState(props.image || "");
	const [error, setError] = useState(false);
	const [complete, setComplete] = useState(false);
	const [showPreview, setShowPreview] = useState(false);
	
	const changeTitle = (e) => {
		setTitle(e.target.value);
	};

	const changeContent = (e) => {
		setContent(e.target.value);
	};

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
			id: props ? props.id : "",
		};

		axios.PUT("/articles", obj).then(res => {	
			setComplete(true);
			setTitle("");
			setContent("");
			setCategory("");
			setImg("");
			setError(false);
			dispatch(changeArticle(res.data.article));
		}
		).catch(error =>  {
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

	const tooglePreview = () => {
		setShowPreview(!showPreview);
	};

	const article = {
		title,
		content, 
		category,
		image: img,
		createdAt: new Date(),
		isPreview: true,
	};
	
	return (
		<div className={styles.container}>
			{props.title && <img src={back} alt="back-btn" onClick={() => props.setShowChangeForm(false)} className={styles.back} /> }
			<img src={showPreview ? cross : eye} onClick={tooglePreview} className={ cn(styles.close, { [styles.previewImg]: !showPreview } ) } alt="close-button"  />		
			{!showPreview && <>
				<p className={styles.caption}>{props.title ? "Редактировать новость" : "Добавить новость"}</p>
				<form className={styles.form} onSubmit={props.title ? changeArticleForm : addArticleForm}>
					<textarea value={title} className={styles.title} onChange={changeTitle} placeholder="заголовок статьи..."/>
					<textarea value={content} className={styles.content} onChange={changeContent} placeholder="контент..." />
					<input className={styles.picInput} type="file" onChange={choiseImg} />
					<select value={category} className={styles.select} onChange={(e) => setCategory(e.target.value)}>
						{categories && categories.map((elem, i) => (
							<option key={i} >{elem.name}</option>
						))}		
					</select>
					<button className={styles.submitBtn}>{props.title ? "Изменить" : "Добавить"}</button>
					{error && <p className={styles.error}>Все поля должны быть заполнены!</p>}
					{complete && <p className={styles.complete}>{props.title ? "Новость обновлена!" :"Новость добавлена!"}</p>}
				</form>
			</>}		
			{showPreview && <Article article={article} />}	
		</div>
	);
}

export default ArticleCreation;