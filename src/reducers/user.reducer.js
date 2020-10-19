import { LOGIN, LOGOUT } from "../actions/user.actions.js";

const user = (state = {}, action) => {
	switch (action.type) {
	case LOGIN:
		return {
			name: action.payload.name,
			token: action.payload.token,
		};
	case LOGOUT:
		return {

		};

	default: 
		return state;

	}
};

export default user;