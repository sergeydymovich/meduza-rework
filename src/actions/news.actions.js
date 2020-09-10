export const ADD_NEW = "ADD_NEW";
export const FILTER_NEWS = "FILTER_NEWS";
export const LOG_IN = "LOG_IN";
export const ADD_CATEGORY = "ADD_CATEGORY";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";
export const SELECT_ARTICLE = "SELECT_ARTICLE";
export const addNew = (value) => (
	{
		type: ADD_NEW,
		payload: {
			value,
			
		},
	}
);
	
export const filterNews = (value) => (
	{
		type: FILTER_NEWS,
		payload: {
			value,		
		},
	}
);

export const logIn = () => (
	{
		type: LOG_IN,
	}
);

export const addCategory = (value) => (
	{
		type: ADD_CATEGORY,
		payload: {
			value,
			
		},
	}
);

export const removeCategory = (id) => (
	{
		type: REMOVE_CATEGORY,
		payload: {
			id,			
		},
	}
);

export const changeCategory = (id ,value) => (
	{
		type: CHANGE_CATEGORY,
		payload: {
			value,
			id,
		},
	}
);

export const selectArticle = (id) => (
	{
		type: SELECT_ARTICLE,
		payload: {
			id,			
		},
	}
);