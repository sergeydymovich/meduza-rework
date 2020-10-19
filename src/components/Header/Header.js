import React  from "react";
import styles from "./Header.module.css";
import { useDispatch, useSelector  } from "react-redux";
import { filterArticles } from "../../actions/filterWord.actions.js";
import { getArticles } from "../../actions/articles.actions.js";
import { logout } from "../../actions/user.actions.js";
import god from "../../assets/god.svg";
import cross from "../../assets/cross.svg";
import { Link } from "react-router-dom";
import  axios from "../../utils/axios.utils";

function Header() {

	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const filterWord = useSelector(state => state.filterWord.filterWord);

	const onChangeInput = (e) => {
		dispatch(filterArticles(e.target.value));
	};

	const loginOut = () => {
		dispatch(logout());
		localStorage.clear();
	};

	const getFilterArticles = () => {

		axios.GET(`/articles?filter=${filterWord}`).then((res) => {
			console.log(res.data.articles.length);

			if (res.data.articles.length > 0) {			
				dispatch(getArticles(res.data.articles));
			} 

			dispatch(getArticles());		
		}).catch(error =>  {
			console.log(error);
		});
	};

	const stopSearch = () => {

		dispatch(filterArticles(""));
		dispatch(getArticles());

		axios.GET("/articles").then(response => {	
			const articles = response.data.articles;	

			dispatch(getArticles(articles)); 				
		}).catch(error =>  {
			console.log(error);

		});
	};

	return (
		<div className={styles.header}>
			<Link to="/"><h1 className={styles.title}>DYMOVICH NEWS</h1></Link>
			<div className={styles.headerInput}>
				<div className={styles.search}>
					<input value={filterWord || ""} type="text" className={styles.search} onChange={onChangeInput} placeholder="Search articles.." />
					{filterWord && <img src={cross} className={styles.close} alt="cross" onClick={stopSearch} />}
					{!user.name &&
							<Link to="/login">
								<button className={styles.loginBtn} >Log in</button>	
							</Link>											
					}
				</div>
				{filterWord && <p onClick={getFilterArticles} className={styles.question}>искать</p>}
				{user.name  && 			
						<div className={styles.admin}>
							<Link to="admin/articles">
								<div className={styles.user}>
									<img src={god} className={styles.god} alt="admin-img"/>
									<p className={styles.adminText}>{user.name}</p>
								</div>
							</Link>	
							<Link to="/login">
								<button className={styles.logoutBtn} onClick={loginOut} >Log out</button>
							</Link>	
						</div> 						   
				}
			</div>	
		</div>
	);
}

export default Header;