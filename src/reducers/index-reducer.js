import { combineReducers } from "redux";
import articles from "./articles.reducer.js";
import user from "./user.reducer.js";
import categories from "./categories.reducer.js";
import contacts from "./contacts.reducer.js";
import reports from "./reports.reducer.js";
import filterWord from "./filterWord.reducer.js";

const rootReducer = combineReducers(
	{ 
		articles,
		user,
		categories,
		contacts,
		reports,
		filterWord,
	}
);

export default rootReducer;