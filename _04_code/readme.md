## Union and Any in typescript 

- *Setup typescript*
```sh

npm init -y 

npm install 

npm install -D typescript

```

## create these two folders .dist and /src create your all ts code files inside the src folder


```sh 

npx tsc --init 

```

## to run you ts code 

```sh 

npx tsc 

node  .dist/ yourjs.js 

```

## Union and Any --> 
{
    **Union** means a value can be **one of multiple types**.  
`any` means **TypeScript stops checking the type** and lets anything pass.

A variable can hold one of these types:

```ts
let id: string | number;

id = 10;
id = "10";
```
- If you try this, it fails:

```ts
id = true; // error
```
- *any*
A variable can hold anything:

```ts
let value: any;

value = 10;
value = "hello";
value = true;
```

- This also compiles, even if it may cause bugs:

```ts
value.toUpperCase(); // no TypeScript error, but may crash at runtime
```
- One-line difference
- union = allowed types only


## Easy difference
- **Union** = still type-safe, but with allowed options.
- **any** = no type safety.

## Best practice
- Use **union** when you know the possible types.
- Use **any** only when you really have no choice.
- any = no type checking

Example:
```ts
let status: "loading" | "success" | "error";
```
This is better than `any` because TypeScript still protects you.


}