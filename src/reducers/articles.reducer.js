import { GET_ARTICLES, CHANGE_ARTICLE, ADD_ARTICLE, DELETE_ARTICLE } from "../actions/articles.actions.js";

const articles = (state = [], action) => {
	switch (action.type) {
	case GET_ARTICLES:
		return [
			...state, ...action.payload.articles
		];
	case CHANGE_ARTICLE:
		return [
			...state.map(elem => (
				elem._id === action.payload.article._id ? { ...action.payload.article, createdAt: elem.createdAt } : elem
			))
		];
	case ADD_ARTICLE:
		return [
			action.payload.article,
			...state
		];
	case DELETE_ARTICLE:
		return [
			...state.filter(el => el._id !== action.payload.id)
		]; 		
	default: 
		return state;

	}
};

export default articles;