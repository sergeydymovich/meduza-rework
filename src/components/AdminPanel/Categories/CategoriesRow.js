import React, { useState } from "react";
import styles from "./Categories.module.css";
import {  removeCategory, changeCategory } from "../../../actions/news.actions.js";
import { useDispatch } from "react-redux";
import { validate }  from "../../../utils/validate.utils.js";

function CategoriesRow(props) {

	const dispatch = useDispatch();
	const [categName, setCategName] = useState(props.name);
	const [isEditMode, setIsEditMode] = useState(false);
	const [error, setError] = useState(false);
	const date = props.date.getDate() + "." + props.date.getMonth() + "." + props.date.getFullYear() + " " + props.date.getHours() + ":" + props.date.getMinutes();
	const saveChanges = () => {
		const isValid = validate(categName, props.categories);

		if (isValid || categName === props.name) {
			dispatch(changeCategory(props.id, categName));
			setIsEditMode(false);
		} else {
			setError(true);
		}		
	};

	const changeRow = (e) => {
		setCategName(e.target.value);
		setError(false);
	};

	return (	
		
		<tr>
			<td className={styles.cell}>{props.index + 1}</td>
			<td className={styles.cell}>
				{isEditMode ? <input className={styles.rowInput} value={categName} onChange={changeRow} /> : props.name}
				{error && <div className={styles.errorText}>Такая категория уже существует!</div>}
			</td>
			<td className={styles.cell}>{props.author}</td>
			<td className={styles.cell}>{date}</td>
			<td className={styles.cell}>
				{isEditMode && <button onClick={saveChanges}>Сохранить</button>}
				{!isEditMode &&
				<>
					<button onClick={() => setIsEditMode(true)}>ред.</button>
					<button className={styles.deleteBtn} onClick={() => dispatch(removeCategory(props.id))}>удалить</button>
				</>
				}			
			</td>
		</tr>
	);		
}

export default CategoriesRow;