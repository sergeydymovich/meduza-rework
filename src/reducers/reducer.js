import { ADD_NEW, FILTER_NEWS, LOG_IN, ADD_CATEGORY, REMOVE_CATEGORY, CHANGE_CATEGORY } from "../actions/news.actions.js";
import { v4 as uuidv4 } from "uuid";

const INITIAL_STATE = {
	isAdmin: false,
	newsArr: [
		{
			content: "Омский врач заявил о проблемах Навального с пищеварением из-за диеты. Эксперты в Германии выяснили, что политика отравили ядом из группы «Новичок»",
			date: new Date(),
			id: "3434223535",
		},
		{
			content: "Apple за день потеряла 180 миллиардов долларов капитализации — это рекордное падение в истории",
			date: new Date(),
			id: "1232132132",
		},
		{
			content: "The Insider: болгарский предприниматель, которого пытались убить «Новичком», не смог получить свои анализы из финской лаборатории",
			date: new Date(),
			id: "757457457",
		},
		{
			content: "«Суверенитет не может быть предметом торга». Тихановская — о переговорах Лукашенко с Мишустиным",
			date: new Date(),
			id: "264547",
		},
		{
			content: "В немецком городе Золинген обнаружили тела пятерых детей. Их мать пыталась покончить с собой",
			date: new Date(),
			id: "34345479",
		},
		
	],
	filteredArr: [],
	filterWord: "",
	categories: [],
	activeArticle: "",	
};

const news = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ADD_NEW: 
		return {
			...state,
			newsArr: [
				...state.newsArr,
				{
					content: action.payload.value,
					date:  new Date(),	
				}
			],
			filteredArr: [],
		};
	case FILTER_NEWS:
		return {
			...state,
			filteredArr: state.newsArr.filter( elem => elem.content.includes(action.payload.value)),
			filterWord: action.payload.value,
		};
	case LOG_IN:
		return {
			...state,
			isAdmin: true,
		};
	case ADD_CATEGORY:
		return {
			...state,
			categories: [
				...state.categories,
				{
					id: uuidv4(),
					name:  action.payload.value,
					author: "ADMIN",
					date: new Date(),	
				}
			],
		};
	case REMOVE_CATEGORY:
		return {
			...state,
			categories: state.categories.filter(elem => elem.id !== action.payload.id)
		};
	case CHANGE_CATEGORY:
		return {
			...state,
			categories: state.categories.map(elem =>  (
				elem.id === action.payload.id ? 
					{ 
						...elem,
						name : action.payload.value
					}
					: 
					elem 
			))
		};
	default: 
		return state;

	}
};

export default news;