let userarr : string[] = ['sham',"ram",'rohani']
// keoki maine type anontate krna hai to main string values he pass kr skata hun es array mein. 

let price: number[] = [122,100,150,120,200]

// make sure ki yeh syntax koi yadd rahkna ki array koi ese he declare krna hai 

// other way 
// custom values using the syntax of array 
let admin_os : Array<"ubuntu" | "debian" | "redhat" | "fedora" | "arch" | "kali" | "parrot"> = ["ubuntu","arch","redhat","debian"]


// primitive type 
let numbers : Array<number> = [100,22,33,44,49,50,89]

console.log();
console.log(admin_os);
console.log("\n",numbers);

// array of objects mostly used one

type _Os_ =  {
    name : string,
    version : number
}
let os1 = admin_os[0]

// make sure to check the syntax 
let _admin_os : _Os_[] = [
    // manual values passing 
    {name:"kali",version:2.0},
    {name:"ubuntu",version:2.0},
    {name:"arch",version:2.0},
    {name:"fedora",version:2.0}
]

// console.log(admin_os[0]);
if (typeof admin_os[0] === "string" ){
    console.log(admin_os[0]);
}
console.log();
console.log(" <== Array of objects ==>");
console.log(_admin_os);


// readonly arrays 
const countries : readonly string[] = ["finland", "denmark", "norway","switzarland"]

// now mai yan koi bhi esmein updates nhi kr skata koi k values readonly hai 

// countries.push("hs") //error milyega or suggestions bhi nhi milti

// union type array 
let mixarr : Array<string |number | object> = []

mixarr.push("hello")
mixarr.push(1022)
mixarr.push({name:"array object"})
console.log(mixarr, typeof mixarr);


// dimentional array 

let tablearr : number [][] =[
    [1,2,3,4],
    [5,7,9,10]
]


let testarr : (object) [][][] = [
    [
        [
            {test:"testing 3d array"},
            {test:"test union with 3d array"},
        ]
    ]
]

console.log();
console.log(testarr[0],"\n");
console.log(testarr[0][0],"\n");
console.log(testarr[0][0][0],"\n");
console.log(testarr[0][0][1],"\n");

// --> tuples in ts 
// yeh ek order mein declare kiya hai or values bhi esi order mein he pass krni hogi make sure k esa he ho 
let mixtuple : [string , number , object]

mixtuple = ["hello tuple", 233, {name: "tuple type hai"}]
console.log();
console.log(mixtuple, typeof mixtuple);

// tuple end the end array he hota hai... 
// ham optional values bhi declare kr ksate hai using the ? mark

// readonly 

const location : readonly [string, number] = ["finland",10202]

// best way to use tuple is named tuple

let tuples : [name:string,version:number] ;
tuples = ["kali",10.2]


// enums 

enum version {
    version1,
    version2,
    version3,
    version4
}

const vs = version.version2

// automatic increament values in enums
enum status {
     pending = 100,
     test1,   // 101
     test2    // 102 
    
     // yeh automatic he allocate hoga ager ek ki value enum mein as number define krdi hai 
}

// give values in string

enum type_user {
    USER1 = "kali",
    USER2 = "ubuntu",
    USER3 = "athena",
    USER4 = "arch"
}

// how to use 
console.log(type_user.USER4);
// console.log(type_user("ubuntu"));  // yeh allowed nhi hai jo values hamne declare kri hai means enums main jo properties names create kre hai uko he use krna ha 

// Note ham enums main bhi mixed typed values define kr skte hain but yeh good practice mein nhi aata aur vese bhi hame enums koi ek he type value ka create krna chaahie like ager enum number type ka hai to number he hone chaahie 