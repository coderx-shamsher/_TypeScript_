"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 
// annotate kiya khud type define kiya 
let value;
// now ham koi bhi type ka data pass kr skte hain es variable mein lets cook
value = 100;
console.log(value, "\n", typeof value);
console.log();
value = "string hai bhai";
console.log(value, "\n", typeof value);
console.log();
value = [1, 23, 4];
console.log(value, "\n", typeof value);
console.log();
// inference 
// means khud he ts type define krti hai.. 
let anvalue;
anvalue = "string";
anvalue = 1000;
// esi cheej koi avoid !!....!! using the annotations with union 
// lets cook....  
let valuenn;
valuenn = "string";
valuenn = 1999;
valuenn = {
    name: "sohan",
    datatype: true
};
// another example 
let my_num;
let numbers = ["12", '13', '14', '2', '5'];
for (let elements of numbers) {
    if (elements === "13") {
        // ese assign krdo mere ek variable main
        my_num = elements;
        break;
    }
    my_num = "23";
}
console.log(my_num); // ok to muje lekin 
// ager main mere my_num koi koi value dedu mere if block k bahar
//# sourceMappingURL=any.js.map