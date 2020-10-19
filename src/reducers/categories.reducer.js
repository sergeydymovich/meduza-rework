import { GET_CATEGORIES, REMOVE_CATEGORY, CHANGE_CATEGORY, ADD_CATEGORY } from "../actions/categories.actions.js";

const categories = (state = [], action) => {
	switch (action.type) {
	case GET_CATEGORIES:
		return [
			...action.payload.categories,
		];
	case ADD_CATEGORY:
		return [
			...state, action.payload.category
		];
	case REMOVE_CATEGORY:
		return [
			...state.filter(elem => elem._id !== action.payload.id)
		];			
	case CHANGE_CATEGORY:
		return [
			...state.map(elem =>  (
				elem._id === action.payload.id 
					? 
					{ 
						...elem,
						name : action.payload.value
					}
					: elem
			))
		];
			
	default: 
		return state;

	}
};

export default categories;