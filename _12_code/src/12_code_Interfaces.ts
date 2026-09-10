// inerface -> for object mostly 

interface objecttest {
    name: string
    age : number
    // add optional property with ? 
    role? : "admin" | "user"

}

const user1 : objecttest = {
    name : "nina",
    age : 33,
    role : "user"
}

console.log("\n Testing user =>", user1);


// creating with property readonly

interface UserAdmins {
    Username : string,
    Userid : string 
   readonly Role  : "Admin" 
}

const adminuser1 : UserAdmins = {
    Username : "marina",
    Userid : "rina33",
    Role : "Admin"
}

console.log("User Admins ->", adminuser1);

// we cannot change the role
adminuser1.Username = "horishi"
adminuser1.Userid = "rishi22"

// adminuser1.Role = "User" ❌
console.log("User Admins ->", adminuser1); // hame console par show to hoga but runtime error hai 


// function with interfaces

// create interface , yeh function ka structure hoga 
// this is index signature 
interface AssignMethod {
    showUsers(): void // void yan koi return type dena jaruri hai ager method define kr rahen hain using the interfaces 
    showadmins( ) : void
}

// implimentaions , usecases 
// ek object create kiya 
const OBJ_test : AssignMethod = {
    showadmins() {
        console.log();
        console.log("\nshowing the admin users i have......");
    },
    showUsers() {
        console.log();
        console.log("\nshowing all the users i have... ");
    },
}

// using method from object 
OBJ_test.showUsers()
OBJ_test.showadmins()


// other best example of index signature -> 
interface SmartPhones {
    [Name:string] : string
}

// 
const phone1 : SmartPhones ={
    "vivo" : "4 gb RAM",
     opop : "4 gb RAM",  // this is also allowd 
    "realme" : '4 gb RAM', 
    "redme" : "4 gb RAM",

}
// yeh object key-value pair jaise he hai but ham value jis type ki hai usi type k data he pass kr skte hain

// moslty yeh avoid he hota hai so good to know 
// just in case 


// inerfaces extends or merge with same name of inerfaces let's see 

// inerface one 
interface objectuser {
    username : string
}

interface objectuser {
    role : "admin" | "user"
}


// ab main 2-2 objects to nhi banounga ! vese bhi mere admin user k pass bhi username hota hai or user k pass username + role to kiya main dono ko use nhi kr skta ? 

const u : objectuser ={
    username : "alexis", // ager ham ese role pass nhi krege to yeh run time error show krega 
    role : "user"
}

// means inerfaces apne ap merge hote hain same name interfaces k sath 

// we can do manually 

interface valueA {
    a : string
}

interface valueB {
    b : number
}

// this is the extends syntax 
interface valueX extends valueA , valueB {} 

// also we add more values on top 
interface valueZ extends valueA,valueB {
  non : object
}


const vn : valueZ = {
    a : "hello",
    b : 55,
    non : {
        status : "ok"
    }
}
console.log();
console.log(vn);


// we can do manually or yeh apne app bhi krdeta hai to inta dikat krne ki jarurat nhi hai... 


console.log();
