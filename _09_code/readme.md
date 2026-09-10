
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

## create scr and .dist folders and also readme file if you need 
```sh 

mkdir src dist 

touch readme.md 

```



## how to run ts code 
```sh 

npx tsc 

#  using node 
node ./dist/yourjsfile.js

``` 
- create script because kuch commands ko bar bar run krna parta hai..
- Better ts code run work flow 

```json
 "scripts": {
    "build": "npx tsc --watch ",
    "code" : "node ./.dist/06_code.js"
  },

```

- also run 

```sh 

npm run  ## to see who many or what kind of scripts you have .. 

```

- change ! ager html koi ts k sath use krna hai 
```json

"compilerOptions" :{
    "module": "esnext",
        "target": "es2025",
    // yeh hai default value of ts config jis ki help say ham nodejs yan terminal mein ts code koi run krsakte hain 
    //   "module": "nodenext",
    // "target": "esnext",

    // apni need k according uncomment kr sakte  hain 
}

```

# ----< Functions in Ts >----
Typescript me functions ka main game hai: **parameters + return type ko clearly type karna, aur React/Next me unko hooks, props, events, API ke saath sahi use karna.** Neeche basics → advanced + React/Next pe focus ke saath.

***

## 1. Basic function typing

### Normal function

```ts
function add(a: number, b: number): number {
  return a + b;
}
```

- `a: number, b: number` → parameter types.
- `: number` after `)` → return type. [typescriptlang](https://www.typescriptlang.org/docs/handbook/functions.html)

### Arrow function (React me bahut use hota hai)

```ts
const add = (a: number, b: number): number => {
  return a + b;
};
```

Agar return simple hai:

```ts
const double = (n: number): number => n * 2;
```

***

## 2. Function type as a variable (very important for React)

Kabhi‑kabhi tum pehle “function ki shape” define karte ho:

```ts
type MathOp = (a: number, b: number) => number;

const add: MathOp = (x, y) => x + y;
const multiply: MathOp = (x, y) => x * y;
```

React props me ye bahut useful hai (callback props, event handlers). [typescriptlang](https://www.typescriptlang.org/docs/handbook/2/functions.html)

***

## 3. Optional, default, rest parameters

### Optional parameter (`?`)

```ts
function greet(name?: string): string {
  return name ? `Hello ${name}` : "Hello Guest";
}
```

- `name?: string` → caller is allowed to skip this argument. 

### Default parameter

```ts
function greetUser(name: string = "Guest"): string {
  return `Hello ${name}`;
}
```

Agar caller naam nahi dega to `"Guest"` use hoga. 

### Rest parameter (`...`)

```ts
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

sum(1, 2, 3); // 6
```

React me onClick me `(...args: unknown[])` pattern bhi milta hai. 

***

## 4. Spec cial return types: `void` and `never`

### `void` – kuch return nahi

```ts
function logMessage(message: string): void {
  console.log(message);
}
```

React handlers mostly `void` return karte hain (onClick, onChange). 

### `never` – kabhi normal return nahi

```ts
function fail(msg: string): never {
  throw new Error(msg);
}
```

Ye advanced type reasoning, exhaustive checks me use hota hai. 

***

## 5. Function overloads (same naam, alag signatures)

Jab function alag‑alag argument combination support kare:

```ts
function format(value: string): string;
function format(value: number): string;

function format(value: string | number): string {
  return `Value: ${value}`;
}

format("hello");
format(123);
```

Overloads React me utna common nahi, lekin utility functions, libs me useful hota hai. 

***

## 6. Generic functions (React hooks ke liye must‑know)

Generic = type ko parameter banado.

```ts
function identity<T>(value: T): T {
  return value;
}

const n = identity<number>(10); // T = number
const s = identity("hello");    // T = string (infer ho gaya)
```

Array map style:

```ts
function map<Input, Output>(
  arr: Input[],
  func: (item: Input) => Output
): Output[] {
  return arr.map(func);
}

const parsed = map(["1", "2", "3"], (n) => parseInt(n));
// parsed: number[]
```

Ye pattern React me custom hooks, reusable utilities me super important hai. 

***

## 7. Functions in React/Next.js – jo sabse zyada matter karta hai

### 7.1 Component function typing

Basic functional component:

```ts
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button = ({ label, onClick }: ButtonProps) => {
  return <button onClick={onClick}>{label}</button>;
};
```

Important points:

- Props ke type define karo (`ButtonProps`).
- `onClick` ka type ek function hai: `() => void`. 

### 7.2 Event handler types

```ts
const Input = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  return <input onChange={handleChange} />;
};
```

Common events:

- `React.MouseEvent<HTMLButtonElement>`
- `React.ChangeEvent<HTMLInputElement>`
- `React.FormEvent<HTMLFormElement>` 
### 7.3 `useState` ke saath functions

```ts
const Counter = () => {
  const [count, setCount] = React.useState<number>(0);

  const increment = () => {
    setCount((prev) => prev + 1);
  };

  return <button onClick={increment}>{count}</button>;
};
```

Yahan:

- `setCount` ko function `(prev) => prev + 1` milta hai – ye bhi function type hai.
- `useState<number>` me generic use hua. 

### 7.4 Async functions in React/Next

```ts
type User = { id: string; name: string };

const fetchUser = async (): Promise<User> => {
  const res = await fetch("/api/user");
  return res.json();
};
```

React component me:

```ts
const Profile = () => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    fetchUser().then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;
  return <p>{user.name}</p>;
};
```

- Async function ka return type `Promise<User>` likhna zaruri hai.
- `useState<User | null>` kyunki initially data nahi hota.  

### 7.5 Generic React hooks

```ts
function useFetch<T>(url: string) {
  const [data, setData] = React.useState<T | null>(null);

  React.useEffect(() => {
    fetch(url)
      .then((r) => r.json())
      .then(setData);
  }, [url]);

  return data;
}

type Todo = { id: number; title: string };

const todos = useFetch<Todo[]>("/api/todos");
```

Yahan:

- `useFetch<T>` generic hook hai.
- Call time pe `<Todo[]>` dekar strong typing milti hai. 

***

## 8. Next.js specific (route handlers, server actions)

### Route handler (Next 13+ app router)

```ts
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "ok" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json({ received: body });
}
```

- `GET`, `POST` functions ka return type `Promise<NextResponse>` hota hai (inferred bhi ho sakta). 

### Server action

```ts
"use server";

export async function createUser(formData: FormData): Promise<void> {
  const name = formData.get("name") as string;
  // DB call etc.
}
```

Yahan bhi clear parameter + return type helpful hai.

***

## 9. Summary – functions me kya kya master karna hai (React/Next dev ke liye)

1. **Basic signatures** – parameters + return type:
   - `function f(a: number, b: string): boolean { … }`
2. **Arrow functions + function types** – kyunki React callbacks, props, hooks me har jagah use hote hain:
   - `type Handler = (id: string) => void;`
3. **Optional / default / rest params** – especially utility functions me.
4. **Return types** – `void`, `Promise<T>`, `never`.
5. **Generics** – reusable helpers (`map`, custom hooks, generic components).
6. **React/Next patterns**:
   - Props me function types (callbacks).
   - Event handler ka sahi React event type.
   - `useState`, `useEffect`, async fetch functions ka proper typing.
   - Next.js route handlers (`GET`, `POST`) and server actions ka type.

Agar chaho, next step me main tumhare liye ek chhota **mini React + TS example** bana sakta hoon jisme:

- typed `fetchUser` function,
- typed `useFetch<T>` hook,
- typed `UserCard` component with function props,

taaki tum real‑world flow ek jagah dekh sako.

