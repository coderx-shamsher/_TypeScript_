"use strict";
// unions annotations type declarations
Object.defineProperty(exports, "__esModule", { value: true });
let a = 10;
// main eseka type change nhi kr sakta 
// but ager meri value number or string dono ho skati hai to main kaise kam krunga... here comes union means ham multiple types annotate kr sakte hain 
let ab;
ab = 100;
console.log(`Value -->${ab}  And Type of --> ${typeof ab}`);
ab = "hello union..";
console.log(`Value -->${ab}  And Type of --> ${typeof ab}`);
// or ham khud k bhi data type bana sakte hain like yeh yeh values ho skti hain... lets cook...
let teststatus;
let user;
// teststatus = "inprogress" // this give me an error Type '"inprogress"' is not assignable to type '"Started" | "InProgress" | "Completed"'. Did you mean '"InProgress"'?
teststatus = "Started";
let apistatus;
apistatus = "error";
// apistatus = "sham_coder"
/**
 * so that how ham khud k data types or values de skte hain k yeh yeh values he honi chaahe
*/
// if(user === "Started" || user === "started" || user === "start"){
//     console.log(`Test is Started....`)     
// }
// else if(user === "InProgress" || user === "inprogress" || user === "progress"){
//     console.log(`Test In progress...`)     
// }
// else if(user === "Completed" || user === "complete" || user === "done"){
//     console.log(`Test is completed successfully ....`)     
// }
// else {
//     console.log("test is not defined")
// }
//# sourceMappingURL=union.js.map