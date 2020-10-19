export const GET_ARTICLES = "GET_ARTICLES";
export const CHANGE_ARTICLE = "CHANGE_ARTICLE";
export const ADD_ARTICLE = "ADD_ARTICLE";
export const REMOVE_ARTICLE = "REMOVE_ARTICLE";

export const getArticles = (articles) => (
	{
		type: GET_ARTICLES,
		payload: {
			articles
		},
	}
);

export const addArticle = (article) => (
	{
		type: ADD_ARTICLE,
		payload: {
			article,
		}
	}
);

export const changeArticle = (article) => (
	{
		type: CHANGE_ARTICLE,
		payload: {
			article,
		}, 
	}
);

export const deleteArticle = (id) => (
	{
		type: REMOVE_ARTICLE,
		payload: {
			id,
		}
	}
);

