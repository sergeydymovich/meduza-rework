export const isExist = (name, value, arr) => (
	
	!!arr.find(el => el[name] === value)
);
 
