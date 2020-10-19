export const GET_REPORTS = "GET_REPORTS";
export const GET_REPORTS_ARTICLES = "GET_REPORTS_ARTICLES";

export const getReports = (reports) => (
	{
		type: GET_REPORTS,
		payload: {
			reports,
		},
	}
);

export const getReportsArticles = (articles) => (
	{
		type: GET_REPORTS,
		payload: {
			articles,
		},
	}
);
