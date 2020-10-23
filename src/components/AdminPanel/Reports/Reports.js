import React, { useEffect, useState } from "react";
import styles from "./Reports.module.css";
import axios from "../../../utils/axios.utils";
import { Link } from "react-router-dom";

function Reports() {

	const [reports, setReports] = useState([]);

	useEffect(() => {
		
		axios.GET("/reported-articles").then(res => {	
			setReports(res.data.reports);
						
		}).catch(error =>  {
			console.log(error);
		});
	},[]);

	return (
		<div className={styles.container}>
			<p className={styles.title}>Замечания</p>
			{reports.map(el => (
				<Link to={`/articles/${el._id}`}  key={el._id} >
					<div className={styles.report} >
						<p className={styles.articleTitle}>{el.title}</p>
						<p className={styles.amount}>reports: {el.count}</p>
					</div>
				</Link>				
			))}			
		</div>
	);
}

export default Reports;