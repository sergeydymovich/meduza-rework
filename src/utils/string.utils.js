export const filterString = (str , word) => {

	const indexArr = [];  
	const lowerStr = str.toLowerCase();
	const lowerWord = word.toLowerCase();

	for(let i = 0; i < str.length; i++){
		const x = lowerStr.indexOf(lowerWord, i);

		if (x === -1) continue;
		i = x ;
		indexArr.push(x);

	}

	const splitStr = str.split("");
	let result = [];

	for (let i = 0; i < splitStr.length; i++) {
		
		if (indexArr.includes(i)) { 
			const subStr = str.slice(i, i + word.length);
			
			result.push(subStr);
			i = i + word.length - 1;  
		} else {   
			result.push(splitStr[i]);     
		}
	}
	return result;
};