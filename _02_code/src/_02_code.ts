// basic function with types 
function testfn (name:string) :string { 
      return `Hello ${name} wellcome into cyberSec`
}

// calling function 
console.log(testfn("john")) 


// basic arrow function
// a void function jo kuch bhi return nhi krta hai, parameter nhi leta just a normal function  
const test_fn_ = ():void =>{
    console.log("this is typescript basic arrow function without returning a single value ");
}
console.log();
test_fn_()

