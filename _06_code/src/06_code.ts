//  Type Assertion 

let res: any;
res = "10"

// is case mein muje suggestion nhi show honge keoki mera type any hai or jab maine ek value pass kri to vo bhi alpanumstring, jo ki string hai vese to or main jb . lagkr string ki methods dekhna chaahta hun to vo muje show nhi ho rahe.. to hame ts koi banta parta hai ki data konsa hai 


// let length_number : number = res.length

// using this method 
let length_number : number = (res as string).length
// ham (data as datatype). laga kr jis data type par operate krna hai uske methods ko show krva sakte ho yeh hai force full type assertion or krna he pardta hai keo ki hame pta hai k data ka type kia hai.. bs ts koi bata hai k believe me .
console.log(length_number)



type game = {
    name : string
}


let oldgame = '{"name": "PUBG"}'

// let gamestring = JSON.parse(oldgame) as game
// console.log(gamestring.name)  


let gamestring = JSON.parse(oldgame) as string
// console.log(gamestring.name)

// to es case main muje yeh error dega -> Property 'name' does not exist on type 'string'. 

// - es keo huya? hame ek object line data keo milta keoki hame kaha k jo hamra data hai oldgame use app jab json.parse kroge to use as game (jo ki mera type hai vo man lo)
// - ager main essa na krun to muje .name like kuch bhi show nhi hoga 




// esko hame batna parta hai ki eski data type value kiyya hogi using the force assertion 
// const inputelement = document.getElementById("name") as HTMLInputElement


let value : any;

value = "string "
value = 29393
value = 77.88

// par ager main es any typed value k uper koi operation krte hain to hamne koi bhi error nhi milta or ager run krte hain to error ayega he ager wrong data par wrong operation ho
// pahli bat to muje koi methods ki suggestions nhi ati.. 

// console.log(value.length) // undefined 

// but ager hamne unknown use kiya hota ho hame run krne par nhi code mein he error show hota jo ki any mein nhi hota 
let neval: unknown;

neval = "heloo"
neval = 9090
// neval = 90.9
// neval = "codery"

// yeh type check hai unknown ki taraff se.. 
// console.log(neval.length)

// ager yeh kam krna he hai to kaise krna hai ? use type guard 

if(typeof neval === "string"){
    console.log(neval.toUpperCase());
}
// else if (typeof neval === "number") {
//     console.log(neval.length);
// }

console.log("hello")
console.log("hello its a typescript")


// now try and catch yeh bhot improtant or used one technique 
try {
    
} catch (error:any) {
    console.log(error.message)
}

// esa krne se kiya huya baiscally mein error ka data type any set krna to muje nhi pta ki konsa type hoga ..  ab yeh method theek tak hai but its not goot at all 

// how to handle without any 

try {
    
} catch ( error ) {
    if (error instanceof Error){
        console.log(error.message)
    }
    console.log("Error",error)
}

// that's how ham esse handle krte hain using the type insetion 

const data: unknown = "admin"

// const datastring: string = data   
//  Type 'unknown' is not assignable to type 'string'.
// es error koi kaise theek krna hai 

// ham use krte hai forcefully assertion
// datastring = 199 
let datastring: string = data as string

// never in ts 
type role= "admin" | "user" | "root"

// maine function ka type void rakha means main eske return value say muje itna fark nhi krdta..  
function sudouser (role : role): void{
   if (role === "admin"){
     console.log("welcome admin into sudo terminal.");
     return
   }
   if(role === "user"){
     console.log("welcome user into user terminal.");
     return
   }
  
   // now ager maine role; esa krna to kiya hota basicaly main suggestion dekh sakta hun ki mere se koi check miss ton nhi huya?  ager huya hai to main ese check kr skata hun 
   role; /// mistakes koi handle krne k liye ...

}





// kabi kabi ek function hota hai jo kuch bhi return nhi kta or uska type nerver hota hai or vo ek infinite loop lke hota hai 