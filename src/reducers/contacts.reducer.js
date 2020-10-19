import { CHANGE_CONTACTS } from "../actions/contacts.actions.js";

const INITIAL_STATE = {
	phone: "+375 44 745 3285",
	email: "DIMOVITCH.SERGEY@GMAIL.COM",
	adress: "HRODNA",
};

const contacts = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case CHANGE_CONTACTS:
		return {
			phone: action.payload.phone,
			email: action.payload.email,
			adress: action.payload.adress,
		};
	default: 
		return state;
	}
};

export default contacts;