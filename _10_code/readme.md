
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

mkdir dist src && touch ./src/10_code.ts

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

# <<< ---- Arrays Tuples and Enums in Ts ---->>>

TypeScript me arrays, tuples, aur enums ka main fayda ye hai ki tum **data structure ka shape aur type clear** kar sakte ho – JS se zyada safe tareeke se. Neeche sab kuch easy language + code + practice ideas ke saath.

***

## 1. Arrays in TypeScript

### 1.1 Basic typed arrays

TypeScript me array ka type 2 tarah se likh sakte ho:

```ts
const nums: number[] = [1, 2, 3];

const names: Array<string> = ["aman", "sara"];
```

Dono same kaam karte hain, pehla syntax (`number[]`) zyada common hai. 

Mixed type array (union):

```ts
const mixed: (number | string)[] = [1, "two", 3];
```

### 1.2 Readonly arrays

JS me koi bhi array mutate ho sakta hai. TS me tum **readonly** bana sakte ho:

```ts
const points: readonly number[] = [10, 20, 30];

// points.push(40); // ❌ Error: Property 'push' does not exist on type 'readonly number[]'.
```

Readable but not changeable – React state, config constants me useful. 

### 1.3 Common array methods (TS vs JS)

Sab JS methods same hain, bas TypeScript inka **type aware** version deta hai:

```ts
const nums: number[] = [1, 2, 3, 4];

// map: number[] -> number[]
const doubled = nums.map((n) => n * 2);

// filter: number[] -> number[]
const even = nums.filter((n) => n % 2 === 0);

// find: number[] -> number | undefined
const firstBig = nums.find((n) => n > 2);

// reduce: number -> number
const sum = nums.reduce((acc, n) => acc + n, 0);
```

Farq sirf ye hai ki TypeScript har method ke return type ko **safely infer** kar deta hai, to tumhe khud likhne ki zarurat nahi. 

### 1.4 Practice ideas (arrays)

- `numbers: number[]` lo, `getMax`, `getMin`, `getAverage` functions banao.
- `Todo[]` type banao:
  ```ts
  type Todo = { id: number; title: string; done: boolean };
  ```
  aur functions likho:
  - `addTodo(todos, newTodo)`
  - `toggleTodo(todos, id)`
  - `getCompleted(todos)`

***

## 2. Tuples in TypeScript

**Idea:** Tuple = “array jiska size aur har position ka type fix hai.”

JS me sirf array hota hai, TS me tum bol sakte ho ke:

- index 0 pe string,
- index 1 pe number,
- etc. 

### 2.1 Basic tuple

```ts
let userTuple: [string, number];

userTuple = ["Aman", 22];   // ✅
 // userTuple = [22, "Aman"]; // ❌ Order galat
```

- Fixed length.
- Fixed order.
- Har index ka specific type.

### 2.2 Real‑world tuple example

#### Example: coordinate

```ts
type Point = [number, number];

const p1: Point = [10, 20];

function distance(a: Point, b: Point): number {
  const dx = a[0] - b[0];
  const dy = a [dx]
  return Math.sqrt(dx * dx + dy * dy);
}
```

#### Example: API sorting rule (field + direction)

```ts
type SortOrder = "asc" | "desc";
type SortField = "price" | "createdAt";

type SortRule = [SortField, SortOrder];

const rules: SortRule[] = [
  ["price", "asc"],
  ["createdAt", "desc"],
];
```

Har item me exactly 2 cheezein: ek field, ek direction. 

### 2.3 Optional / rest elements in tuple (modern TS)

```ts
// First fixed fields, baaki string messages
type LogEntry = [Date, "info" | "error", ...string[]];

const entry1: LogEntry = [new Date(), "info"];
const entry2: LogEntry = [new Date(), "error", "User", "not", "found"];
```

Yahan tuple + rest ka use ho raha hai. 
### 2.4 Tuples vs arrays

- Array: “ye list of X type hai” → `string[]`.
- Tuple: “is position pe ye type hi aayega” → `[string, number]`.

Tuples zyada strict hote hain. 

### 2.5 Practice ideas (tuples)

- Type banao:  
  ```ts
  type HttpResponse = [statusCode: number, body: string];
  ```
  aur `handleResponse(res: HttpResponse)` function banao.
- Type banao:
  ```ts
  type RGB = [number, number, number];
  ```
  aur helper likho:
  ```ts
  function toHex(color: RGB): string {/* ... */}
  ```

***

## 3. Enums in TypeScript

JS me enum nahi hota, sirf objects / string literals hote hain. TS enums **runtime JS code generate** karte hain jo named constants deta hai. 

### 3.1 Numeric enum (classic)

```ts
enum Direction {
  Up,       // 0
  Down,     // 1
  Left,     // 2
  Right,    // 3
}

let dir: Direction = Direction.Up;
```

Agar tum first value ko set karo:

```ts
enum Status {
  Pending = 1,
  InProgress, // 2
  Done,       // 3
}
```

Enums JS me object ban jaate hain (key→value, value→key). 

### 3.2 String enum (modern, safer)

```ts
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

function isAdmin(role: Role) {
  return role === Role.Admin;
}
```

String enums usually safer aur readable hote hain. 

### 3.3 `const enum` (performance)

```ts
const enum LogLevel {
  Debug,
  Info,
  Error,
}

const current: LogLevel = LogLevel.Debug;
```

`const enum` compile time pe **inline** ho jaata hai (runtime object nahi banta), lekin kuch build setups me dikkat de sakta hai (especially isolatedModules). 

### 3.4 Enum vs union type (modern recommendation)

Aaj kal bahut log **string literal unions** prefer karte hain:

```ts
// enum Role { Admin = "ADMIN", User = "USER", Guest = "GUEST" }

type Role = "ADMIN" | "USER" | "GUEST";

function isAdmin(role: Role) {
  return role === "ADMIN";
}
```

Kyoon?

- Simplest JS output (koi extra object nahi).
- Narrowing, auto‑complete, exhaustive checks union types ke saath bohot strong hote hain.
- Enums kabhi‑kabhi complex ho jaate hain (reverse mapping etc.). 

**Modern rule of thumb:**

- App code me mostly `type Role = "ADMIN" | "USER"` style.
- Enums sirf jab:
  - external interface / legacy code me use already ho raha ho,
  - ya tum specifically runtime object chahte ho. 

### 3.5 Practice ideas (enums / unions)

- Enum:
  ```ts
  enum PaymentStatus { Pending, Paid, Failed }
  ```
  aur `getStatusMessage(status: PaymentStatus): string` banao.

- Same cheez union type se:
  ```ts
  type PaymentStatus = "PENDING" | "PAID" | "FAILED";
  ```

Compare karo kaunsa code clean lagta hai.

***

## 4. Methods overview – arrays, tuples, enums

### 4.1 Arrays – important JS methods (TS typed)

Tum in sab ko TypeScript me use karoge (type aware):

- `push`, `pop`, `shift`, `unshift`
- `map`, `filter`, `reduce`, `find`, `findIndex`
- `some`, `every`
- `includes`, `indexOf`
- `slice`, `splice`
- `sort` (with compare function)
- `concat`, spread: `[...arr, x]` 

Example:

```ts
const names: string[] = ["a", "b", "c"];

const upper = names.map((n) => n.toUpperCase());  // string[]
const hasA = names.includes("a");                 // boolean
const short = names.filter((n) => n.length === 1);// string[]
```

### 4.2 Tuples – same methods, but type aware

```ts
type Point = [number, number];

const p: Point = [10, 20];
const x = p[0]; // number
const y = p [1]  // number
```

Tuples technically array hi hote hain, but TypeScript per‑index type track karta hai, especially jab tum destructure karte ho:

```ts
const [lat, lng] = p; // lat: number, lng: number
```

### 4.3 Enums – runtime object methods

Enum as JS object:

```ts
enum Color {
  Red = "RED",
  Blue = "BLUE",
}

Object.keys(Color);   // ["Red", "Blue"]
Object.values(Color); // ["RED", "BLUE"]
```

Lekin bahut cases me simple union string + helper object better hota hai:

```ts
const COLORS = ["RED", "BLUE"] as const;
type Color = (typeof COLORS)[number];
```

***

## 5. Modern practice tips (React / Next / general TS)

1. **Arrays**
   - Always give clear element type: `User[]`, `Todo[]`, not `any[]`.
   - Prefer **immutable updates**:
     ```ts
     const newTodos = todos.map(t => t.id === id ? {...t, done: !t.done} : t);
     ```
   - Use `readonly` arrays for constants / config.

2. **Tuples**
   - Use for **small fixed structures**:
     - `[number, number]` for points,
     - `[field, order]` for sorting,
     - `[statusCode, body]` for HTTP responses.
   - Avoid over‑complicating – bohot lambi tuples confuse kar deti hain.

3. **Enums vs unions**
   - New code me mostly:
     ```ts
     type Status = "idle" | "loading" | "success" | "error";
     ```
   - Enums tab jab:
     - multiple languages / services share kar rahe ho,
     - ya strong runtime mapping chahiye. 

***

## 6. Small practice set (tum khud try karo)

1) **Array + type**

```ts
type Product = { id: number; name: string; price: number };

const products: Product[] = [
  { id: 1, name: "Book", price: 200 },
  { id: 2, name: "Pen", price: 20 },
];

// Practice:
function getTotalPrice(items: Product[]): number {
  // reduce use karo
}

function findProductById(items: Product[], id: number): Product | undefined {
  // find use karo
}
```

2) **Tuple**

```ts
type ApiResponse = [status: number, data: string | null];

function printResponse(res: ApiResponse) {
  const [status, data] = res;
  // status aur data ka use karo
}
```

3) **Enum vs union**

```ts
// (A) Enum
enum ThemeEnum {
  Light = "light",
  Dark = "dark",
}

// (B) Union
type Theme = "light" | "dark";

function setTheme(t: Theme) {
  // ...
}
```

Dekho kaunsa style tumhe zyada clean lagta hai.

Sources jo in topics ko detail me cover karte hain: 

***

Agar tum chaho, next message me main in teenon (arrays + tuples + enums/union) ke saath ek **chhota Next/React style example** bana sakta hoon – jaise Todo app ke liye:

- `TodoStatus` union / enum,
- `Todo[]` state,
- `[filter, sort]` tuple – taaki ye sab real component me dikh jaye.


Pehle tumhara code samajhte hain, phir multidimensional arrays + union types + access tricks step‑by‑step dekhenge.

***

## 1. Tumhara code kya kar raha hai

```ts
// 2‑dimensional array (matrix)
let tablearr: number[][] = [
  [1, 2, 3, 4],
  [5, 7, 9, 10],
];

// 3‑dimensional array of objects
let testarr: object[][][] = [
  [
    [
      { test: "testing 3d array" },
      { test: "test union with 3d array" },
    ],
  ],
];

console.log();
console.log(testarr[0]);
```

### `tablearr: number[][]`

- `number[]` = ek 1D array of numbers.
- `number[][]` = array of (array of numbers) → 2D array.

So `tablearr` ka structure:

- `tablearr[0]` → `[1, 2, 3, 4]` (first row)
- `tablearr [1] ` → `[5, 7, 9, 10]` (second row)

Har element ek `number[]` hai.

### `testarr: object[][][]`

- `object` = TypeScript ka broad object type (thoda loose).
- `object[]` = 1D array of objects.
- `object[][]` = 2D array of arrays of objects.
- `object[][][]` = 3D array.

Tumne actual data is form me rakha:

- `testarr[0]` → `[[{...}, {...}]]` (2D layer)
- `testarr[0][0]` → `[{...}, {...}]` (1D row)
- `testarr[0][0][0]` → `{ test: "testing 3d array" }` (object)
- `testarr[0][0][1]` → `{ test: "test union with 3d array" }`

`console.log(testarr[0])` sirf outermost first layer print karega (still nested arrays).

***

## 2. Multidimensional array kaise access karte hain

### 2D (`number[][]`)

```ts
let tablearr: number[][] = [
  [1, 2, 3, 4],   // row 0
  [5, 7, 9, 10],  // row 1
];

// row 0, column 0
const a = tablearr[0][0]; // 1

// row 0, column 2
const b = tablearr[0][2]; // 3

// row 1, column 3
const c = tablearr [0][3] // 10
```

Access rule:

- Pehla index = row
- Dusra index = column

Loop karna ho:

```ts
for (let i = 0; i < tablearr.length; i++) {
  for (let j = 0; j < tablearr[i].length; j++) {
    console.log(`row ${i}, col ${j} =`, tablearr[i][j]);
  }
}
```

### 3D (`T[][][]`)

```ts
let testarr: { test: string }[][][] = [
  [
    [
      { test: "testing 3d array" },
      { test: "test union with 3d array" },
    ],
  ],
];

// level 1 (depth)
console.log(testarr[0]);       // [[{...}, {...}]]

// level 2 (row)
console.log(testarr[0][0]);    // [{...}, {...}]

// level 3 (column / actual object)
console.log(testarr[0][0][0]); // { test: "testing 3d array" }
console.log(testarr[0][0][1]); // { test: "test union with 3d array" }
```

3D socho:

- pehla index → kaunsa “layer” (3D stack ka page)
- dusra index → kaunsi row
- teesra index → kaunsa column / element

***

## 3. Union types multidimensional array me kaise use karein

Bilkul use kar sakte ho. Idea:

- Normal 1D me: `(A | B)[]`
- 2D me: `((A | B)[])[]` ya `(A | B)[][]`
- 3D me: `(A | B)[][][]`

### 3.1 2D array with union

Example: ya to number hoga, ya string:

```ts
let grid: (number | string)[][] = [
  [1, 2, "X"],
  [4, "O", 6],
];

const x = grid[0][2]; // type: number | string
```

Yahan har cell ka type `number | string` hai.

### 3.2 3D array with union of objects

Maano tumhare 3D array me do tarah ke objects hon:

```ts
type TestObj =
  | { type: "simple"; test: string }
  | { type: "detailed"; test: string; info: string };

let testarr: TestObj[][][] = [
  [
    [
      { type: "simple", test: "testing 3d array" },
      { type: "detailed", test: "test union with 3d array", info: "more..." },
    ],
  ],
];

// Access
const item = testarr[0][0][1]; // TestObj

if (item.type === "detailed") {
  // yahan TS ko pata hai ke 'info' definitely hai
  console.log(item.info);
}
```

Isme humne:

- multidimensional array rakha,
- har element ek **union type** hai (2 shapes),
- `item.type` check karke narrowing kiya.

### 3.3 Mixed element types in multidimensional array

```ts
type Cell = number | { blocked: boolean };

let map: Cell[][] = [
  [1, 2, { blocked: true }],
  [3, 4, 5],
];

const cell = map[0][2]; // number | { blocked: boolean }

if (typeof cell === "number") {
  console.log("value:", cell);
} else {
  console.log("blocked:", cell.blocked);
}
```

Union + multidimensional → bilkul valid pattern.

***

## 4. Tumhare `testarr` ko strongly type karne ka better tareeka

Abhi:

```ts
let testarr: object[][][] = [ ... ];
```

`object` bohot generic hai. Better:

```ts
type Test = { test: string };

let testarr: Test[][][] = [
  [
    [
      { test: "testing 3d array" },
      { test: "test union with 3d array" },
    ],
  ],
];

console.log(testarr[0][0][0].test); // "testing 3d array"
```

Ab:

- `testarr[0][0][0]` ka type `Test` hai,
- `.test` property strongly typed string hai.

Agar union chahiye:

```ts
type Test =
  | { kind: "simple"; test: string }
  | { kind: "advanced"; test: string; extra: string };

let testarr: Test[][][] = [
  [
    [
      { kind: "simple", test: "A" },
      { kind: "advanced", test: "B", extra: "info" },
    ],
  ],
];
```

***

## 5. Practice ideas (direct tumhare question se related)

1) **2D table with union**

```ts
type Cell = number | null;

let table: Cell[][] = [
  [1, 2, null],
  [4, null, 6],
];

// function to print all non-null cells:
function printTable(t: Cell[][]) {
  for (let i = 0; i < t.length; i++) {
    for (let j = 0; j < t[i].length; j++) {
      const cell = t[i][j];
      if (cell !== null) {
        console.log(`cell[${i}][${j}] =`, cell);
      }
    }
  }
}
```

2) **3D array of objects with union**

```ts
type Voxel =
  | { type: "air" }
  | { type: "solid"; material: "stone" | "wood" };

let world: Voxel[][][] = [
  [
    [
      { type: "air" },
      { type: "solid", material: "stone" },
    ],
  ],
];

// function getVoxel(world, x, y, z) likho
// and based on type print different info.
```

***

## 6. Short recap in Hinglish

- `number[][]` = 2D array, `arr[row][col]` se access.
- `T[][][]` = 3D array, `arr[layer][row][col]`.
- Union multidimensional me bilkul use ho sakta:
  - 2D: `(number | string)[][]`
  - 3D: `({ test: string } | { id: number })[][][]`
- Tumhara `testarr: object[][][]` technically sahi hai, but best practice ye hai ke specific type jitna ho sake utna define karo (e.g. `{ test: string }[][][]`).

Agar chaho to tum apna **exact use‑case** bata sakte ho (e.g. game map, table data, API response), main uske hisaab se ek clean type + access pattern bana dunga.