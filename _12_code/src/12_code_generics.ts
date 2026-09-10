// generics are also templates like interfaces 
console.log();
// it makes code more reusable 

function ArraReturn<DataType>(value:DataType): DataType[] {
    return [value]
}
// or 
// yeh ek function hai jismein ager ham ek value pass krte hain like string toh hamein arrays of string milega , ager number then array of numbers etc 
function ArraReturn1<T>(value:T): T[] {
    return [value]
}


console.log(ArraReturn("hello arrays"));
console.log(ArraReturn({name : "tesitng", age : 11111111}));

const user : object[] = [
    {username: "ram"},
    {username: "sham"},
    {username: "shubham"},
    {username: "shishu"},
]

console.log(ArraReturn(user));

// first without returning values 
function pair<A,B> (a: A | string, b : B | string) {
    console.log([a,b]);
}
console.log();
pair("hello","generics")


// void return type 
function userobject <key,value>(a:key,b:value) : void{
    console.log(" User object => \n ",{a,b});
}

userobject("key","value")


// with return type object 
function User_Object_ <key,value>(a:key,b:value) : {a,b}  {
    return  {a,b}
}

let result1 = User_Object_("json","javascript object notation")
console.log("\n",result1);



// generic interfaces 
// <datatype> -> pass the datatype identifier name here
interface Note<DT> {
    title: DT 
    content : DT  | string 
    // ager uska type dt nhi hai to string hoga 
}

// here when we create object : k bad jaise interface use krna hai inerfaceName<pass the data type (string,number etc)> yeh krna jaruri hai
const note1 : Note<string> = {
    title : "complete the Typescript",
    // title : 112, // Type 'number' is not assignable to type 'string'
    content : "make sure to relearn the TypeScript and strong your concepts"
    // content : true // Type 'boolean' is not assignable to type 'string
}
// make sure to keep the data types in mind 
console.log("\n interfaces with generics =>");
console.log(note1);



// generics are morely used in apis and react states etc sky is the limit

interface apiResponse <DataType>{
    status : "success" | "error" | "loading" | "Not Found"
    data: DataType | object[] | string[] | number[] 
}

// yeh hai mera response jo ki ek array or object hai 
let resapi1 : apiResponse<[{username : string,role: "admin" | "user" | "guest"}]> = {
    status : "success",
    data : [
        {username: "jasmeen",role: "user"},
        {username: "jaskirat",role: "guest"},
        {username: "jeena",role: "user"},
    ]
}
console.log();

console.log(resapi1);


// data type is string array string[]
let resapi2 : apiResponse <string[]> ={ 
   status : "loading",
   data : []
}

console.log();
console.log(resapi2);


// so that is the generics i practice and yeh mere nason mein hoga 
console.log();