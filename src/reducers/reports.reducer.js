import { GET_REPORTS, GET_REPORTS_ARTICLES } from "../actions/reports.actions.js";
const INICIAL_STATE = {
	reportsArr: [],
	reportsArticles: [],
};

const reports = (state = INICIAL_STATE, action) => {
	switch (action.type) {
	case GET_REPORTS:
		return {
			...state,
			reportsArr: [...action.payload.reports]
		};
	case GET_REPORTS_ARTICLES:
		return {
			...state,
			reportsArticles: [...action.payload.articles]
		};
	default: 
		return state;
	}
};

export default reports;