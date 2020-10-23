import React, { useState } from "react";
import styles from "./Categories.module.css";
import { format } from  "date-fns";
import ruLocale from "date-fns/locale/ru";
import axios from "../../../utils/axios.utils";
import { useDispatch } from "react-redux";
import { removeCategory, changeCategory } from "../../../actions/categories.actions.js";

function CategoriesRow({ categ, index }) {

	console.log("render categories-row");
	const dispatch = useDispatch();
	const [category, setCategory] = useState(categ.name);
	const [isEditMode, setIsEditMode] = useState(false);
	const [error, setError] = useState(false);
	const propsDate = new Date(categ.createdAt);
	const date = format(
		propsDate,
		"dd/MM/yyyy HH:mm",
		{ addSuffix: true,
			locale: ruLocale,	}
	);
	
	const saveChanges = () => {

		const obj = {
			name: category,
			author: categ.author,
			id: categ._id,
		};

		axios.PUT("/categories", obj).then(() => {	
			dispatch(changeCategory(categ._id, category));
			setIsEditMode(false);
		}).catch(error =>  {
			console.log(error);
			setError(true);
		});		
	
	};

	const changeRow = (e) => {
		setCategory(e.target.value);
		setError(false);
	};

	const deleteCategory = () => {
		const id = categ._id;

		axios.DELETE("/categories", { id }).then(() => {	
			dispatch(removeCategory(categ._id));
		}).catch(error =>  {
			console.log(error);
		});
	};

	return (	
		
		<tr>
			<td className={styles.cell}>{index + 1}</td>
			<td className={styles.cell}>
				{isEditMode ? <input className={styles.rowInput} value={category} onChange={changeRow} /> : categ.name}
				{error && <div className={styles.errorText}>Такая категория уже существует!</div>}
			</td>
			<td className={styles.cell}>{categ.author}</td>
			<td className={styles.cell}>{date}</td>
			<td className={styles.cell}>
				{isEditMode &&  <button onClick={saveChanges}>Сохранить</button>}
				{!isEditMode &&
					<>
						<button onClick={() => setIsEditMode(true)}>ред.</button>
						<button className={styles.deleteBtn} onClick={deleteCategory}>удалить</button>
					</>
				}		
			</td>
		</tr>
	);		
}

export default CategoriesRow;