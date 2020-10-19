export const FILTER_ARTICLES = "FILTER_ARTICLES";

export const filterArticles = (value) => (
	{
		type: FILTER_ARTICLES,
		payload: {
			value,		
		},
	}
);
