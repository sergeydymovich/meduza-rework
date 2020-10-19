export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const login = (name, token) => (
	{
		type: LOGIN,
		payload: {
			name,
			token
		}
	}
);

export const logout = () => (
	{
		type: LOGOUT,
	}
);