export const CHANGE_CONTACTS = "CHANGE_CONTACTS";

export const changeContacts = (phone, email, adress) => (
	{
		type: CHANGE_CONTACTS,
		payload: {
			phone,
			email,
			adress,
		},
	}
);