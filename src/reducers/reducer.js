import {  TOOGLE_ADMINPANEL, ADD_NEW, FILTER_NEWS } from "../actions/news.actions.js";

const INITIAL_STATE = {
		isAdmin: true,
		newsArr: [],
		showAdminPanel: false,
		filteredArr: [],
		filterWord: ""		
}

 const news = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case TOOGLE_ADMINPANEL: 
		return {
			...state,
			showAdminPanel: !state.showAdminPanel,
		}
		case ADD_NEW: 
		return {
			...state,
			newsArr: [
				...state.newsArr,
				{
					content: action.payload.value,
					date:  new Date(),	
				}
			],
			filteredArr: [],
		}
		case FILTER_NEWS:
		return {
			...state,
			filteredArr: state.newsArr.filter( elem => elem.content.includes(action.payload.value)),
			filterWord: action.payload.value,
		}
		
		default: 
			return state;

	}
}

export default news;