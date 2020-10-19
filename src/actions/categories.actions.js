export const GET_CATEGORIES = "GET_CATEGORIES";
export const REMOVE_CATEGORY = "REMOVE_CATEGORY";
export const CHANGE_CATEGORY = "CHANGE_CATEGORY";
export const ADD_CATEGORY = "ADD_CATEGORY";

export const getCategories = (categories) => (
	{
		type: GET_CATEGORIES,
		payload: {
			categories,		
		},
	}
);

export const addCategory = (category) => (
	{
		type: ADD_CATEGORY,
		payload: {
			category,			
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