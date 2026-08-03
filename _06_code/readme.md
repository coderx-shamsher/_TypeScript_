
# setup  typescript 

```sh 
npm init -y 

npm install --ignore-scripts 

#npm ci 

# or you can type this 

npm clean-install  

npm install -D typescript

# tsc install or init 
npx tsc --init 

```

- make sure to uncomment the folder paths of /dist and your ts code folder its /src 

```json 
  "compilerOptions": {
    // File Layout
    "rootDir": "./src/",
    "outDir": "./.dist/",

}
// jo bhi path apko shi lage 
```

## create scr and .dist folders
```sh 

mkdir src .dist 

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
    "nxts" :"npx tsc",
    "coderun" : "node .dist/03_code.js"
}

```


- Better ts code run work flow 

```json
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "npx tsc --watch ",
    "code" : "node ./.dist/06_code.js"
  },

```
-  you need to append --watch  to your build script 
- or code script koi manualy run krlo its much easy 
- npm run code


Type assertion TypeScript me woh way hai jisme tum compiler ko bolte ho: **“trust me, mujhe is value ka type pata hai.”** Iska runtime pe koi effect nahi hota — ye sirf compile time pe TypeScript ko samjhata hai. [tutorialsteacher](https://www.tutorialsteacher.com/typescript/type-assertion)

## Easy meaning
Socho TypeScript confuse hai ki koi value string hai ya number, but tumhe pakka pata hai. Tab tum type assertion use karke usse bolte ho ki isko string maan lo ya number maan lo. [abhishekw.medium](https://abhishekw.medium.com/typescript-understanding-type-assertion-c06be90e1ba1)

Example:
```ts
let value: any = "hello";
let strLength = (value as string).length;
```

Yahan `value as string` ka matlab hai: “is value ko string samjho.” [tutorialsteacher](https://www.tutorialsteacher.com/typescript/type-assertion)

## Forcefully type assertion
“Forcefully type assertion” usually us case ko bolte hain jab tum **double assertion** use karte ho, jaise:

```ts
let element = event as unknown as HTMLElement;
```

Isme pehle `event` ko `unknown` banaya gaya, phir `HTMLElement` me assert kiya. Ye tab use hota hai jab direct assertion TypeScript allow nahi karta. [basarat.gitbook](https://basarat.gitbook.io/typescript/type-system/type-assertion)

## Why this is risky
Type assertion safety check nahi karta. Agar tum galat type assert kar doge, TypeScript maan lega ki tum sahi ho, but runtime pe crash ho sakta hai. Isliye type assertion ko sirf tab use karo jab tum **really sure** ho. [tutorialspoint](https://www.tutorialspoint.com/typescript/typescript_type_assertions.htm)

Example danger:
```ts
let x: any = 123;
let s = x as string;
console.log(s.length);
```

TypeScript allow kar dega, but runtime me problem aa sakti hai because asal value number thi. [abhishekw.medium](https://abhishekw.medium.com/typescript-understanding-type-assertion-c06be90e1ba1)

## Normal assertion vs forced assertion
- **Normal assertion**: `value as string`
- **Forceful/double assertion**: `value as unknown as string` [stackoverflow](https://stackoverflow.com/questions/19461479/what-is-the-type-assertion-operator-for-in-typescript)

Double assertion ko log tab use karte hain jab TypeScript direct conversion reject karta hai, but ye last-resort technique hai. [basarat.gitbook](https://basarat.gitbook.io/typescript/type-system/type-assertion)

## Real use cases
Type assertion useful hota hai:
- DOM elements me, jab tumhe pata ho specific element kya hai.
- API response me, jab backend shape tumhe known ho.
- Old JS code ko TypeScript me migrate karte time.
- Event objects ko specific type me treat karne ke liye. [stackoverflow](https://stackoverflow.com/questions/19461479/what-is-the-type-assertion-operator-for-in-typescript)

Example DOM:
```ts
const input = document.getElementById("username") as HTMLInputElement;
console.log(input.value);
```

## Better practice
Agar possible ho to **type guard** ya proper typing use karo, because assertion se safety reduce hoti hai. Type assertion ko shortcut samjho, default solution nahi. [basarat.gitbook](https://basarat.gitbook.io/typescript/type-system/type-assertion)

## Hinglish summary
Type assertion ka matlab hai: **“compiler, mujhe type pata hai, tum isko ye type maan lo.”** `as string` normal assertion hai, aur `as unknown as Something` forceful/double assertion hai. Ye compile-time pe help karta hai, runtime pe nahi; galat use karoge to bug aa sakta hai. [tutorialsteacher](https://www.tutorialsteacher.com/typescript/type-assertion)

Agar chaho, main next message me **type assertion vs type guard vs type casting** ko ek simple table me samjha deta hoon.

TypeScript me `unknown` aur `never` dono “special” types hain, but inka use bilkul opposite situations me hota hai.

***

## 1. `unknown` type

**Definition:**  
`unknown` ka matlab hai: “ye value kuch bhi ho sakti hai, lekin main isko use karne se pehle type‑safe rehna chahta hoon.”

- Ye `any` ka **safe** version hai.
- Tum variable me kuch bhi assign kar sakte ho.
- Lekin us value ko use karne se **pehle** tumhe type check / assertion karna padega.

### Example

```ts
let value: unknown;

value = 42;
value = "hello";
value = { name: "Aman" };

// console.log(value.toUpperCase()); // ❌ Error: Object is of type 'unknown'

if (typeof value === "string") {
  console.log(value.toUpperCase());  // ✅ allowed after narrowing
}
```

`unknown` use karo jab:

- Tumhe pata hai data “kisi bhi type ka ho sakta hai” (e.g. API response, user input, JSON),
- Aur tum chahte ho ki aage use karte time **compulsory type‑check** ho.

Short:  
- `any` = “jo marzi karo, main check nahi karunga.”
- `unknown` = “jo marzi assign karo, but use karne se pehle proof do.”

***

## 2. `never` type

**Definition:**  
`never` ka matlab hai: “ye value kabhi exist hi nahi karegi” ya “ye function kabhi normal return nahi karega”.

Common cases:

1. **Function jo kabhi return nahi karta**  
   (hamesha `throw` karta hai ya infinite loop me rehta hai)

```ts
function fail(message: string): never {
  throw new Error(message);
}
```

2. **Impossible states / exhaustive checks**

```ts
type Status = "loading" | "success" | "error";

function handleStatus(status: Status) {
  switch (status) {
    case "loading":
      return "Loading...";
    case "success":
      return "Done";
    case "error":
      return "Failed";
    default:
      // yahan theoretically kabhi nahi aana chahiye
      const _exhaustive: never = status; // ❌ agar naya case add hua aur handle nahi kiya
      return _exhaustive;
  }
}
```

Yahan `never` TypeScript ko batata hai:  
“agar `status` ka koi aisa value aaya jo handled nahi hai, to ye **galti hai**.”

Short:
- `never` = “impossible / unreachable” value.
- Zyada tar use:  
  - functions that never return,  
  - **exhaustive `switch`** me missing cases pakadne ke liye.

***

## 3. Unknown vs Never (side‑by‑side)

| Cheez          | `unknown`                             | `never`                                    |
|----------------|---------------------------------------|--------------------------------------------|
| Meaning        | Type is unknown but *may exist*       | Type jo kabhi exist hi nahi karta          |
| Assignments    | Kuch bhi assign kar sakte ho          | Kuch bhi directly assign nahi kar sakte    |
| Use            | Use karne se pehle type‑check zaroori | Mostly internal / compiler reasoning       |
| Typical use    | API data, user input, JSON parsing    | Error functions, exhaustive `switch`       |
| Safety         | Safe, forces narrowing                | Expresses impossible states                 |

Ek tarah se socho:

- `unknown` = “mujhe pata nahi ye kya hai, but main safe rahunga.”
- `never` = “aisa case logically kabhi aana hi nahi chahiye.”

***

## Hinglish summary

- **`unknown`** tab use karo jab koi value “kuch bhi” ho sakti hai, lekin tum chahte ho ke aage move karne se pehle TypeScript tumse type‑check maange.
- **`never`** tab aata hai jab tum bolna chahte ho “ye function kabhi wapas nahi aayega” ya “ye state kabhi possible nahi honi chahiye”, jaise exhaustive `switch` me default case.

Agar chaho to main next message me in dono ke 3–4 **practice questions** de sakta hoon (guess the type, kya error hoga, etc.) taaki tumhara concept pakka ho jaye.