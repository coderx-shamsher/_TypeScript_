// function 
/** function (parameter : data type ) : return type (datatype){
 *      
 * }
 * 
 *  */ 
function return_fn(Name:string): string {
      return `Hello ${Name}`
}

// calling function 
console.log(return_fn("coderTs"))
// console.log(return_fn(22))  // error because type script type error keo k user string value he pass kr sakta

// but ager node ki help say run krte ho to yeh code run hoga 
console.log(return_fn(22)) 