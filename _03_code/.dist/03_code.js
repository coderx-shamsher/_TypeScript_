"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ts type inference - khud he type gusse kr leta hai jo ki ham js main bhi krte hain 
let os = "linux";
// os = 100     
// anontation type declaration 
// you can create jo bhi data types declare krna hai 
let numb = 100;
let name = "coderx";
console.log(numb, "Type is -> ", typeof numb);
console.log(name, "Type is -> ", typeof name);
// function with annotation types 
// inference type function keoki hamne koi return type nhi annotate kra use apne ap he gusse kr liya 
function test(parameter) {
    console.log("function with ", parameter);
}
console.log();
test("hello");
console.log();
// function with return type : void , without any parameter 
function _return_() {
    console.log("hello its void function ");
}
_return_();
// return type annotate function 
function _test_() {
    //    return the value with return keyword 
    return "test return string type function ";
}
console.log();
console.log(_test_());
//# sourceMappingURL=03_code.js.map