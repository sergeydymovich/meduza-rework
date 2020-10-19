import React, { useState } from "react";
import styles from "./Categories.module.css";
import { isExist }  from "../../../utils/isExist.utils.js";
import { format } from  "date-fns";
import ruLocale from "date-fns/locale/ru";
import axios from "../../../utils/axios.utils";
import { useDispatch } from "react-redux";
import { removeCategory, changeCategory } from "../../../actions/categories.actions.js";

function CategoriesRow(props) {

	const dispatch = useDispatch();
	const [category, setCategory] = useState(props.name);
	const [isEditMode, setIsEditMode] = useState(false);
	const [error, setError] = useState(false);
	const propsDate = new Date(props.createdAt);
	const date = format(
		propsDate,
		"dd/MM/yyyy HH:mm",
		{ addSuffix: true,
			locale: ruLocale,	}
	);
	
	const saveChanges = () => {
		const isValid = isExist("name", category, props.categories);

		if (!isValid || category === props.name) {
			const obj = {
				name: category,
				author: props.author,
				id: props.id,
			};

			axios.PUT("/categories", obj).then(() => {	
				dispatch(changeCategory(props.id, category));
				setIsEditMode(false);
			}).catch(error =>  {
				console.log(error);
			});		
		} else {
			setError(true);
		}		
	};

	const changeRow = (e) => {
		setCategory(e.target.value);
		setError(false);
	};

	const deleteCategory = () => {
		const id = props.id;

		axios.DELETE("/categories", { id }).then(() => {	
			dispatch(removeCategory(props.id));
		}).catch(error =>  {
			console.log(error);
		});
	};

	return (	
		
		<tr>
			<td className={styles.cell}>{props.index + 1}</td>
			<td className={styles.cell}>
				{isEditMode ? <input className={styles.rowInput} value={category} onChange={changeRow} /> : props.name}
				{error && <div className={styles.errorText}>Такая категория уже существует!</div>}
			</td>
			<td className={styles.cell}>{props.author}</td>
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