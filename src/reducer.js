import {  TOOGLE_ADMINPANEL, ADD_NEW, FILTER_NEWS } from "./actions";

const INITIAL_STATE = {
		isAdmin: true,
		newsArr: [],
		showAdminPanel: false,
		filteredArr: [],		
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
					content: action.payload.value		
				}
			],
			filteredArr: [],
		}
		case FILTER_NEWS:
		return {
			...state,
			filteredArr: state.newsArr.filter( (elem) => elem.content.includes(action.payload.value))
		}
		
		default: 
			return state;

	}
}

export default news;