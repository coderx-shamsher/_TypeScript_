## Ts setup  

```sh
 npm init -y 

## to install typescript
 npm install -D typescript 


## tsc install 
 npx tsc --init
```

## tsconfig.json mein 
```json
    "rootDir": "./src/",  // yeh ./src folder hain jis mein ts hamse expect kr raha hai k mera sara code esmein hoga or yeh esmein watch krega.
    "outDir": "./dist/",  // yeh folder hona jaruri hai keok ts emmiter jo .js file convert krk dega vo esi folder mein milegi or ese change bhi kr sakte hain or dono folde ka path change kr sakte hain... 

```
 
## how to run ts code 

```sh 

npx tsc 

#using node 
node ./dist/_02_code.js

```

also create script into package json
```json 

  "scripts": {
    "code": "node ./.dist/_02_code.js",
   // "build": "npx tsc"  
    "build": "npx tsc --watch"  
  },
 
```
- NOTE -> hame bar bar npm run build command ko run krna pardta hai from now just add --watch at the end of the tsc command from now only one command npm run code  

--- 

## Functions in TS (Function with Types)
Functions are the fundamental building block of any application in JavaScript. They’re how you build up layers of abstraction, mimicking classes, information hiding, and modules. In TypeScript, while there are classes, namespaces, and modules, functions still play the key role in describing how to do things. TypeScript also adds some new capabilities to the standard JavaScript functions to make them easier to work with.

### Typing the function
Let’s add types to our simple examples from earlier:

```ts
function add(x: number, y: number): number {
  return x + y;
}
 
let myAdd = function (x: number, y: number): number {
  return x + y;
};

```

--- 

```ts 

// Basic arrow function with explicit types
const add = (a: number, b: number): number => {
    return a + b;
};

// Implicit return (omitting curly braces and 'return' keyword for single expressions)
const multiply = (a: number, b: number): number => a * b; 

```

// 1. Optional and Default Parameters
// You can flag parameters as optional using ? or assign fallback default values. 

```ts
// Optional parameter (greet can be called with one or two arguments)
const greet = (name: string, greeting?: string): string => {
    return `${greeting ?? "Hello"}, ${name}!`;
};

// Default parameter
const power = (base: number, exponent: number = 2): number => base ** exponent;

```




