import React, { useEffect, useState } from "react";
import styles from "./Reports.module.css";
import axios from "../../../utils/axios.utils";

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
			{reports.map((el, i) => (
				<div className={styles.report} key={i}>
					<p className={styles.articleTitle}>{el.title}</p>
					<p className={styles.amount}>reports: {el.count}</p>
				</div>
			))}			
		</div>
	);
}

export default Reports;