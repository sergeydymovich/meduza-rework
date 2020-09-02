
export const filterString = (str , word) => {

  let result = [];

  for(let i=0; i < str.length; i++){

    let x = str.indexOf(word, i);
    if (x === -1) continue;
    i = x ;
    result.push(x)

  }

  let splitStr = str.split("")
  let result1 = []

  for (let i = 0; i < splitStr.length; i++) {
    
    if (result.includes(i)) {   
      result1.push(word)
      i = i + word.length - 1;  
    } else {   
      result1.push(splitStr[i])      
    }
  }

  return result1;
}

  