import React, { useState } from "react";
import styles from "./Categories.module.css";
import { addCategory } from "../../../actions/news.actions.js";
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames/bind";
import CategoriesRow from "./CategoriesRow.js";
import { validate }  from "../../../utils/validate.utils.js";

function Categories() {

	const dispatch = useDispatch();
	const categories =	useSelector(state => state.news.categories);
	const [category, setCategory] = useState("");
	const [error, setError] = useState(false);

	const submitForm = () => {
		const isValidate = validate(category, categories);

		if (isValidate) {
			dispatch(addCategory(category));
			setCategory("");
		} else {
			setError(true);
		}
		
	};

	const changeNewCategory = (e) => {
		setCategory(e.target.value);
		setError(false);
	};
	
	return (
		<div className={styles.container}>
			<h1>Категории</h1>
			<table className={styles.table}>
				<tr>
					<th className={styles.head}>ID</th>
					<th className={styles.head + " " + styles.nameColumn}>название</th>
					<th className={styles.head}>автор</th>
					<th className={styles.head}>дата создания</th>
					<th className={styles.head + " " + styles.changeColumn}>изменить</th>
				</tr>
				{categories.length > 0 && categories.map((elem, i) => (					
					<CategoriesRow
						key={i}
						id={elem.id}
						name={elem.name}
						author={elem.author}
						date={elem.date}
						index={i}
						categories={categories}
					/>
				))}		
			</table>
			<h3>Создание новой категории</h3>
			<form className={styles.categoriesForm} onSubmit={(e) => e.preventDefault()}>
				<input type="text" value={category} className={ cn(styles.categories, { [styles.error]: error })} placeholder="название категории.."  onChange={changeNewCategory} />
				{error && <div className={styles.errorText}>Такая категория уже существует</div>} 
				<button className={styles.submitBtn} onClick={submitForm} disabled={!category} >Добавить</button>
			</form>
		</div>
	);
}

export default Categories;