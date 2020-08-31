
export const TOOGLE_ADMINPANEL = "TOOGLE_ADMINPANEL";
export const ADD_NEW = "ADD_NEW";
export const FILTER_NEWS = "FILTER_NEWS";

export const toogleAdminPanel = (amount) => {
	return {
		type: TOOGLE_ADMINPANEL,
		payload: {
			amount,
			
		},
	}
}

export const addNew = (value) => {
	return {
		type: ADD_NEW,
		payload: {
			value,
			
		},
	}
}

export const filterNews = (value) => {
	return {
		type: FILTER_NEWS,
		payload: {
			value,		
		},
	}
}