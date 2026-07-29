# -- todays typescript Topic (Annotations and inference in ts)


# setup  typescript 

```sh 
npm init -y 

npm install --ignore-scripts && npm clean-install 

npm install -D typescript

# tsc install or init 
npx tsc --init 

```
## create scr and .dist folders
```sh

mkdir src .dist

## to make file use this command 
touch ./src/test.ts  ## like that  

```


## how to run ts code 
```sh 

npx tsc 

#  using node 
node ./dist/yourjsfile.js

``` 
- create script because kuch commands ko bar bar run krna parta hai..
```json 

"scripts":{
    "watch_tsc" :"npx tsc --watch",
    "code" : "node .dist/02_code.js"
}

```

--- 

## Notes by Ai - 
Type annotation aur type inference TypeScript ke do ways hain types handle karne ke.

## Type annotation
Tum **khud type likhte ho**.

```ts
let age: number = 20
```

Yahan `: number` type annotation hai.  
Matlab TypeScript ko clearly bata diya gaya ke `age` sirf number hoga.

## Type inference
TypeScript **khud type samajh leta hai**.

```ts
let age = 20
```

Yahan TypeScript samajh gaya ke `age` ka type `number` hai.  
Tumhe type likhne ki zarurat nahi padi.

## Simple difference
- **Annotation** = tum type likhte ho.
- **Inference** = TypeScript type guess karta hai.

## Kab kya use karna hai
- Simple cases me inference use karo.
- Jab type unclear ho, annotation do.

## Short example
```ts
let name = "Ali"      // inference: string
let city: string = "Amritsar" // annotation: string
```

React/TypeScript job ke liye yaad rakhna:  
**pehle inference, phir zarurat ho to annotation.**


---

### Type inference 
- mean typescript basic data types koi samjta hai (string,number,arrays,etc all) ager main ek variable create kiya 
```ts

// first maine ek vairable create kiya jis ki value hai ek string koi type declare nhi kiya maine ts ne apne appp he dekh liya k konsa data type hai mere variable main...! 
let os = "linux" 

// but now ager main usi variable main string data koi change krna chahun to ts error show krega k aapne abhi to string data pass kra tha or ab number ? 

os = 100     //Type 'number' is not assignable to type 'string'.


// ese he bolte hain inferencing or type inferencing
```

---

### Type Anontations 
```ts
// anontation type declaration 
let numb:number = 100

let name:string = "coderx"

// you can create jo bhi data types declare krna hai 
```

--- 

## Types in Typescript in Detail Doc

**noImplicitAny**
When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to any.
You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag noImplicitAny to flag any implicit any as an error.


> NOTE <_>  In most cases, though, this isn’t needed. Wherever possible, TypeScript tries to automatically infer the types in your code. For example, the type of a variable is inferred based on the type of its initializer:

```ts
// No type annotation needed -- 'myName' inferred as type 'string'
let myName = "Alice";

```

## Functions
Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both the input and output values of functions.

#### Parameter Type Annotations
When you declare a function, you can add type annotations after each parameter to declare what types of parameters the function accepts. Parameter type annotations go after the parameter name:

```ts
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```
When a parameter has a type annotation, arguments to that function will be checked:

--- 

## Return Type Annotations
You can also add return type annotations. Return type annotations appear after the parameter list:

```ts
function getFavoriteNumber(): number {
  return 26;
}

```
Much like variable type annotations, you usually don’t need a return type annotation because TypeScript will infer the function’s return type based on its return statements. The type annotation in the above example doesn’t change anything. Some codebases will explicitly specify a return type for documentation purposes, to prevent accidental changes, or just for personal preference.