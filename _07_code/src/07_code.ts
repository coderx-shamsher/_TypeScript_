// - 1 type creating 
type UserType = {
    type: string,
    role: string,
    skill: string
}

// yeh hamne signature create kra hai. 

function makeuser(user: UserType) {
    console.log(user);
}

function shouser(user: UserType) {
    console.log(user)
}


// jab mere do functions hai or mere dono functions main data da jo signature hai means data ka type hamne define kra hai same hai to us case main ham ese krne se acha ek type create kr skte hain 


// type jaisa ek or keyword hota hai 
// let see the example 

type test_ = {
    user: string,
    roleid: number
} // object 

// interface structure or syntax how to declare 
interface test_1 {
    user: string,
    roleid: number
}

// mai ek class create krta hun jo es type koi implement krti hai means type ki properties koi 

// error = Class 'ubuntuuser' incorrectly implements interface 'test_'.
class ubuntuuser implements test_ {
    // ab ager hame values define krdete hain to hame koi error nhi show hota. 
    user = "admin"
    roleid = 101
}

// one more special case 

type test_user = "user" | "admin"

interface tst_user {
    user: "admin" | "user"

}
// ese ham interface ki help say object create krte hain 

// abb ham ese class mein use kr sakte hain 
class showuse implements tst_user {
    user: "admin" | "user" = "admin"

}


// class user implements test_user {

// } 
//  A class can only implement an object type or intersection of object types with statically known members.
// yeh error ka solution hai interface 


// union value with class type error example code 
type res = { ok: true } | { ok: false }


// class testresponse implements res {
//     ok: boolean = true 
// }

// boolean value ka custom type object bhi ham classes main implement nhi kr skte hain.. 


// Note these type are  literal types 
type testrespo = "pending" | "done" | "not received"

function showrespo(res: testrespo) {
    if (res === "done" ) {
        return `Api Response ==> ${res} `
    }
    if (res === "pending") {
        return `Api Response ==> ${res} `

    }
    if (res === "not received") {
        return `Api Response ==> ${res} `

    }
}


console.log(showrespo("done"))
console.log(showrespo("pending"))
console.log(showrespo("not received"))


// intersection 
type item = {water: number} 
type item2 = {fruits: number}


type shake = item & item2
// to yeh hai intersection code syntax means mera shake type ek dono types ki intersection se create hoga , vese ager easy mein samjne to dono types k mere shake type mein hona jaruri hai its like and operator 

if ( 10 === 10 && 20 < 30 ){
    console.log("yeah its the best example for intersection in ts ")
}

// kuch ese he ham log intersection koi use krenge in ts 

let shake1 : shake = {
    water : 50, // ager ek he property pass krte ho to error show hoga keoki dono value he chaahie 
    fruits : 3  
}

// now ager hamne dono properties ko fullfill kra to yeh koi error nhi dega.. 

// es case main hame koi optional value bhi aa skti hai to use kaise handle krna hai 

type user = {
     userid : number ,
     username?: string
}
// property?: ? ka matalab hai k uss property ki value a bhi sakti hai or nhi bhi 

let usr  : user = {
    userid : 102
}

// or ager ham hamri optional value nhi dete to code mein koi bhi error nhi ata.. 


// readonly value in ts 
type config = {
    readonly  userconfig : object ,
    showuserid : number
}

// maine ek type banya jisi property ek object type ki hogi but one time declare hogi or readonly hogi 

let userconfig__ : config ={
    userconfig : {
        username : "admin0x0",
        role : "sudo",
        userid : 102
    },
    showuserid : 103
}

// now ab ager main mere userconfig ko yan uski koi property koi change krne ki koisis krun to asa nhi honedega ts 

// console.log(userconfig__)
console.log(userconfig__.showuserid)
// userconfig__.userconfig = {name : "test"}  // Cannot assign to 'userconfig' because it is a read-only property.

// but main mere showuserid koi change kr skta hun 
userconfig__.showuserid = 203

// console.log(userconfig__)
console.log(userconfig__.showuserid)