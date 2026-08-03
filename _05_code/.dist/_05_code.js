"use strict";
//  hamne type anontation kiya or hame union ki help se string and number dono type ko anontate kiya tn ki dono values ko operate kiya ja sake
Object.defineProperty(exports, "__esModule", { value: true });
function testing(kind) {
    if (typeof kind === "string") {
        return `hello ${kind}`;
    }
    return `hi its number ${kind}`;
}
// jaise he hamne type ko define kiya to hame hamare data type ki hisab se ye suggestions mill rahe hai, string par string k methods or suggestion and number par number methods and suggestions
// truthiness checking practice 
function testingf1(mesg) {
    if (mesg) {
        return `${mesg} hello !`;
    }
    else
        return `Hello user !`;
}
// exzustive checking 
function username(user) {
    if (user === "admin") {
        return `${user} welcome in workspace`;
    }
    else if (user === "admin0x") {
        return `${user} welcome in workspace`;
    }
    return ` sudo id ===> ${user}`;
}
// ager 2 classes k ander same name method hai to kaise pta chlega k konsi class ka method call huya hai let cook
class testadmin {
    show() {
        console.log("admin welcome");
    }
}
class testuser {
    show() {
        console.log("user welcome");
    }
}
// ek function mein ham check kr skate hain k konsa object kis class se aya hai.. 
function check(username) {
    // using if with instanceof 
    if (username instanceof testadmin) {
        return username.show();
    }
    else {
        return username.show();
    }
}
let usertst1 = new testadmin;
let usertst2 = new testuser;
check(usertst1);
function test_type_user(obj) {
    if (typeof obj === "object"
        &&
            obj !== null
        &&
            typeof obj.type === "string"
        &&
            typeof obj.username === "string"
        &&
            typeof obj.role === "string"
        &&
            typeof obj.id === "string")
        return obj;
}
// hamne ke function likha hai jo mere custom type object ka type check kr raha  hai data type one by one.. yeh production level par bhot jiyda use hota hai... 
let obj = {
    type: "string",
    username: "coderx",
    role: "admin",
    id: 1007
};
test_type_user(obj);
// now mera sudo user jo type main create kr chuka hun unmeinse he koi hoga jaise maine type keyword main primitive data types nhi meri khud ki values define kri hai as data types 
// maine define kiya k user ka type mere sudouser types mein se he hoga 
function check_user_(user) {
    switch (user.type) {
        case "debianuser":
            return `${user.type}`;
            break;
        case "ubuntuadmin":
            return `${user.type}`;
            break;
        case "fedorauser":
            return `${user.type}`;
            break;
        case "archadmin":
            return `${user.type}`;
            break;
    }
    // default case set kne ki jarurt nhi koi hame value pta hai k konsi hongi or kaise hongi.. vese default set krna achi practice hai 
}
// check_user_()
// ham  ek property ko check kr sakte hain ki ager property ho us object main to ham koi opertation krenge
function admin_check(user) {
    if ("role" in user) {
        console.log("admin is here ");
    }
}
// unknown type means pahle data ka type hame nhi pta but jab data for example function se bahar jaye to uska type ham anontate krde baata de ts koi 
// function isarrstr(arr:unknown):arr is string[]{
// }
//# sourceMappingURL=_05_code.js.map