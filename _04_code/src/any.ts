// 
// annotate kiya khud type define kiya 
let value : any ;

// now ham koi bhi type ka data pass kr skte hain es variable mein lets cook

value = 100
console.log(value,"\n", typeof value);
console.log()
value = "string hai bhai"
console.log(value,"\n", typeof value);
console.log()
value = [1,23,4]
console.log(value,"\n", typeof value);
console.log()

// inference 
// means khud he ts type define krti hai.. 

let anvalue ; 

anvalue = "string"
anvalue = 1000 

// esi cheej koi avoid !!....!! using the annotations with union 
// lets cook....  

let valuenn : string | number | object | "baka"

valuenn = "string"
valuenn = 1999
valuenn = {
    name : "sohan",
    datatype : true
}

// another example 
// declared variable inference
// let my_num; 

// 3)  annotation 
// let my_num: string;

//5) union annotate
let my_num: string | undefined ;

let numbers = ["12",'13','14','2','5']
for(let elements of numbers) {
     if(elements === "13"){
      
        // ese assign krdo mere ek variable main
         my_num = elements;
         break;
     }
    my_num ="22"

}

// my_num = 22  

// 2) so this bug maker think in code , keoki hamne to string value he as output expect ki thi es liye annotate krna jaruri hai
// maine mere variable ka type string set kr diya to next yeh error aya -->

// 4) Variable 'my_num' is used before being assigned.
console.log(my_num) // how to fix this , eska matlab ho skta hai k mere loop mein mere my_num koi value koi asssign he na hoyi ho to us case mein ham value define krdu if block k barhar tab bhi yeh error solve nhi hoga then how to solve this use union annotation undefined keoki ho skta hai k mere variable k pass koi value ho he na !! 


//  
// 1) ager main mere my_num ko koi value dedu mere if block k bahar like number example ager maine annotation nhi kiya hai to koi error show nhi hoga inference ki vjah say.
