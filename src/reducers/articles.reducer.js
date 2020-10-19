import { GET_ARTICLES, CHANGE_ARTICLE, ADD_ARTICLE, REMOVE_ARTICLE } from "../actions/articles.actions.js";

const articles = (state = [], action) => {
	switch (action.type) {
	case GET_ARTICLES:
		return [
			...state, ...action.payload.articles
		];
	case CHANGE_ARTICLE:
		return [
			...state.map(elem => (
				elem._id === action.payload.article._id ? action.payload.article : elem
			))
		];
	case ADD_ARTICLE:
		return [
			...state, action.payload.article
		];
	case REMOVE_ARTICLE:
		return [
			...state.filter(el => el._id !== action.payload.id)
		]; 		
	default: 
		return state;

	}
};

export default articles;