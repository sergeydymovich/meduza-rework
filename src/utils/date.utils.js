export const  declOfNum = (min) => { 
  
	let textFormArr = [];
	let n = 0;
	const minutesLeft = Math.trunc(min) + 1;

	if (minutesLeft < 60) {
		n = minutesLeft;
		textFormArr = [" минута ", " минуты ", " минут "];
	} 
	if (minutesLeft >= 60 && minutesLeft < 1440) {
		n = Math.trunc(min/60);
		textFormArr = [" час ", " часа ", " часов "];
	}
	if (minutesLeft > 1440) {
		n = Math.trunc(min/60/24);
		textFormArr = [" день ", " дня ", " дней "];
	}

	const n1 = n % 10;

	if (n > 10 && n < 20)  return n + textFormArr[2]; 
	if (n1 > 1 && n1 < 5)  return n + textFormArr[1]; 
	if (n1 === 1 )  return n + textFormArr[0]; 
	if (n === 0 )  return textFormArr[0];
	return n + textFormArr[2];
};