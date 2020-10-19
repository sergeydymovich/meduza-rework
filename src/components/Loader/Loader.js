import React from "react";
import styles from "./Loader.module.css";

function Loader() {
	
	return (
		<div className={styles.ldsSpinner}>
			<div className={`${styles.ldsSpinner1} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner2} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner3} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner4} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner5} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner6} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner7} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner8} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner9} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner10} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner11} ${styles.spinnerItem}`}></div>
			<div className={`${styles.ldsSpinner12} ${styles.spinnerItem}`}></div>
		</div>
	);
}

export default Loader;
