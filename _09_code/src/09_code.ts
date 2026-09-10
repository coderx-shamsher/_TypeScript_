// let's create a function 
// ts k ander hame ager function koi paramerters lye raha hai to uske types declare krne pardte hain there is two method 


// 1) function with pre-declared types 
// ham sabse pahle ek type create krenge 

type testtype = {
    testuname: string,
    id: number
    country: string
}

// now lets create a function 
// yeh function without return type hai means ham koi bhi value return nhi kr rahe 
// good practice hoti hai k hame function ki as void set kr den ek good ts practice hai
// syntax  

// function fn ():void {} 

function testfn(test: testtype): void {
    console.log(test);
}
console.log();
testfn({ testuname: "usertesting", id: 22, country: "finland" })

// 2) let declare types inside function 

function testfnc(order: {
    productname: string,
    price: number
}): void {
    console.log(order);
}
console.log();
testfnc({ productname: "smartphone", price: 20000 })


// function with return types 
// yeh function bhi same he parameter type declare krta hai  
function testing(name: string): object {
    return {
        name,
        role: "chef",
        salary: "3950$"
    }
}

// keoki return kre rahein hai to value koi kise variable yan function koi console k ander he call krna parda 
console.log();
let u1 = testing("mikasa")
console.log(u1);


// parameter ko check bhi kr skte hain jaise ham krte hai if ki help se 

type order = {
    orderid: number
    ordername: string
}

function orders(order: order): object {

    let { orderid, ordername } = order
    if (!orderid && !ordername) {
        order = {
            orderid: 0,
            ordername: "null"
        }
    }
    return {
        orderid,
        ordername
    }

}
console.log();
console.log(orders({orderid:101,ordername:"coffee"}));

// parameter values hame optional bhi set kr sakte hain 
// 1) type mein declare krna 
type test = {
    name ?: string
}

// 2) inside a function 

function parameter(test?:string):void {
    if(test){
        console.log("we have ==> ", test);
    }
    console.log("testing  optional value ");
}
console.log();
parameter()
// or ager ? mark nhi krna to default value set krdo 

function params(default_:string = "its default"):void {
    console.log(default_);
}

console.log();
params()

// yeh do ways hai ager function js mein kre hai to yeh easy hai ... 
// default values koi end mein declare krte hain 

// ager function ki return type value set nhi krte to vese ts automati

