import React, { useState } from "react";
import styles from "./Categories.module.css";
import { useSelector } from "react-redux";
import cn from "classnames";
import CategoriesRow from "./CategoriesRow.js";
import { isExist }  from "../../../utils/isExist.utils.js";
import { addCategory } from "../../../actions/categories.actions.js";
import { useDispatch } from "react-redux";
import axios from "../../../utils/axios.utils";

function Categories() {

	const dispatch = useDispatch();
	const user =	useSelector(state => state.user);
	const categories = useSelector(state => state.categories);
	const [category, setCategory] = useState("");
	const [error, setError] = useState(false);

	const submitForm = (e) => {
		e.preventDefault();
		const isValidate = isExist("name", category, categories);

		if (!isValidate) {
			let obj = {
				name: category,	
				author: user.name,
			};

			axios.POST("/categories", obj).then((res) => {

				dispatch(addCategory(res.data.category));
			
				setCategory("");
			}).catch(() =>  {
				console.log("серверная ошибка");
			});

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
			<p className={styles.title}>Категории</p>
			<table className={styles.table}>
				<thead>
					<tr>
						<th className={styles.head}>ID</th>
						<th className={cn(styles.head, styles.nameColumn)}>название</th>
						<th className={styles.head}>автор</th>
						<th className={styles.head}>дата создания</th>
						<th className={styles.head + " " + styles.changeColumn}>изменить</th>
					</tr>
				</thead>
				<tbody>
					{categories && categories.map((elem, i) => (					
						<CategoriesRow
							key={i}
							id={elem._id}
							name={elem.name}
							author={elem.author}
							createdAt={elem.createdAt}
							index={i}
							categories={categories}
						/>
					))}	
				</tbody>					
			</table>
			<h3>Создание новой категории</h3>
			<form className={styles.categoriesForm} onSubmit={submitForm}>
				<input type="text" value={category} className={ cn(styles.categories, { [styles.error]: error })} placeholder="название категории.."  onChange={changeNewCategory} />
				{error && <div className={styles.errorText}>Такая категория уже существует</div>} 
				<button className={styles.submitBtn} disabled={!category}>Добавить</button>
			</form>
		</div>
	);
}

export default Categories;