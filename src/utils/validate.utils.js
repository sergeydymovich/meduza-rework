export const validate = (name , arr) => {
	let isValidate = true;

	for (let elem of arr) {
		if (elem.name === name) {
			
			return isValidate = false;
		}
	}
	return isValidate;
};