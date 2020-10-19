import { FILTER_ARTICLES } from "../actions/filterWord.actions.js";

const INITIAL_STATE = {
	filterWord: "",
};

const filterWord = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case FILTER_ARTICLES:
		return {
			...state,
			filterWord: action.payload.value,
		};
	default: 
		return state;

	}
};

export default filterWord;