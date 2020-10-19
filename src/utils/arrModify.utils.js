import { format } from  "date-fns";
import ruLocale from "date-fns/locale/ru";

export const  arrModify = (arr) => {

	const formatDate = (rawDate) => {
		const date = new Date(rawDate);
		const result = format(
			date,
			"d MMMM yyyy",
			{ 
				addSuffix: true,
				locale: ruLocale,
			}	
		);
		
		return result;
	};

	let key = arr.map(elem =>	formatDate(elem.createdAt));

	const days = key.filter((item, pos) => (
		key.indexOf(item) === pos
	));
	const articles = days.map(elem => ({ [elem]: arr.filter(el => formatDate(el.createdAt) === elem) } ));
	
	return [articles, days];
};

