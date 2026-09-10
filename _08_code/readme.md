
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

# --->>>>> Objects in Ts <<<<<----

TypeScript ke objects ko samajhne ka best tareeka ye hai ki pehle **basic object typing** samjho, phir **modern utility types** (Partial, Required, Omit, Pick, Record, Readonly, etc.) pe aao. Neeche sab kuch easy examples ke saath hai.

***

## 1. Basic object types (modern style)

### a) Inline type

```ts
const user: { name: string; age: number } = {
  name: "Aman",
  age: 22,
};
```

Ye simple hai, but baar‑baar repeat karne pe boring ho jaata hai.

### b) `type` alias (recommended for re‑use)

```ts
type User = {
  id: number;
  name: string;
  age: number;
  isAdmin?: boolean; // ? = optional
};

const u1: User = { id: 1, name: "Aman", age: 22 };
const u2: User = { id: 2, name: "Sara", age: 30, isAdmin: true };
```

- `?` = property optional.
- Agar optional property na do, TypeScript error nahi dega.

### c) `interface` (bhi same kaam)

```ts
interface User {
  id: number;
  name: string;
  age: number;
  isAdmin?: boolean;
}
```

Real projects me `type` + utility types ka mix kaafi common hai. 

***

## 2. Readonly, optional, index signatures

### a) `readonly`

```ts
type User = {
  readonly id: number;
  name: string;
};

const user: User = { id: 1, name: "Aman" };

// user.id = 2; // ❌ Error: id is readonly
```

Ye mutability control ke liye useful hai. 

### b) Index signatures (dynamic keys)

Jab keys runtime pe string hote hain:

```ts
type StringMap = {
  [key: string]: string;
};

const translations: StringMap = {
  hello: "Namaste",
  bye: "Alvida",
};
```

***

## 3. Modern utility types: `Partial`, `Required`, `Omit`, `Pick` (MOST IMPORTANT)

Ye built‑in helpers hain jo existing object type ko transform karte hain. 
### Base type

```ts
type User = {
  id: string;
  name: string;
  email: string;
  age?: number;
};
```

***

### 3.1 `Partial<T>` – sab ko optional bana do

Use case: **update API / form where har field zaroori nahi**.

```ts
type UserUpdate = Partial<User>;
// Same as:
// type UserUpdate = {
//   id?: string;
//   name?: string;
//   email?: string;
//   age?: number;
// };

function updateUser(id: string, data: UserUpdate) {
  // data me kuch bhi subset aa sakta hai
}

updateUser("u1", { name: "New Name" });        // ok
updateUser("u1", { email: "x@y.com", age: 25 }); // ok
updateUser("u1", {});                          // bhi ok
```

- Har property optional ho jaati hai.
- Perfect for “patch” / “partial update” payloads. 

***

### 3.2 `Required<T>` – sab ko required bana do

Use case: **final validated object jisme ab sab fields honi hi chahiye**.

```ts
type UserRequired = Required<User>;
// age ab required ho jayega

const u1: UserRequired = {
  id: "1",
  name: "Aman",
  email: "a@a.com",
  age: 22, // ab dena zaroori
};
```

Ye kab use hota hai?

- Jab tumne default + optional sab merge karke final config bana liya ho.
- Function ke andar final state me sab fields guaranteed chahiye. 

***

### 3.3 `Omit<T, K>` – kuch keys hata do

Use case: **aisa type chahiye jo original jaisa ho but kuch fields ke bina**.

```ts
type UserWithoutId = Omit<User, "id">;
// id hata diya

const newUserData: UserWithoutId = {
  name: "Aman",
  email: "a@a.com",
  age: 22,
  // id nahi dena yahan
};
```

Common use:

- `CreateUser` payload me `id` nahi chahiye (kyunki DB banayega).
- Sensitive fields (password) hata ke client ko data bhejna. 

***

### 3.4 `Pick<T, K>` – sirf kuch keys lo

Use case: **sirf kuch properties ka type chahiye** (e.g. profile, list item).

```ts
type UserPublicProfile = Pick<User, "name" | "email">;

const profile: UserPublicProfile = {
  name: "Aman",
  email: "a@a.com",
};
```

- `Pick` = “ye fields rakho”.
- `Omit` = “ye fields hata do”.

Dono kaam same type ke different view banane me aata hai. 
***

## 4. Aur useful utilities: `Readonly`, `Record`

### 4.1 `Readonly<T>`

Object ko immutably treat karne ke liye:

```ts
type User = {
  id: string;
  name: string;
};

type FrozenUser = Readonly<User>;

const u: FrozenUser = { id: "1", name: "Aman" };

// u.name = "New"; // ❌ Error
```

State management / config me helpful.

***

### 4.2 `Record<K, T>` – “map/dictionary” types

Use case: **object jisme keys known set hai, values ka same type**.

```ts
type Role = "admin" | "user" | "guest";

type RoleDescriptions = Record<Role, string>;

const roles: RoleDescriptions = {
  admin: "Full access",
  user: "Limited access",
  guest: "Read only",
};
```

Ya dynamic ids:

```ts
type UserStore = Record<string, User>;

const users: UserStore = {
  "u1": { id: "u1", name: "Aman", email: "a@a.com" },
  "u2": { id: "u2", name: "Sara", email: "s@s.com" },
};
```

`Record` bohot common hai for lookup objects. 
***

## 5. Combining utilities (real‑world patterns)

### a) Create vs Update types

```ts
type User = {
  id: string;
  name: string;
  email: string;
  age?: number;
};

type CreateUserInput = Omit<User, "id">;      // client se, without id
type UpdateUserInput = Partial<CreateUserInput>; // partial fields for patch

function createUser(data: CreateUserInput) {}
function updateUser(id: string, data: UpdateUserInput) {}
```

Ye pattern har REST/CRUD project me dikhega. 

### b) Partial + Pick

Sirf kuch fields ko partially update karna:

```ts
type UpdateUserProfile = Partial<Pick<User, "name" | "age">>;

function updateProfile(id: string, data: UpdateUserProfile) {
  // name/age optional dono
}
```

***

## 6. Object types + functions (modern style)

### a) Object parameter type

```ts
type LoginPayload = {
  email: string;
  password: string;
};

function login(payload: LoginPayload) {
  console.log(payload.email);
}
```

### b) Optional object parameter with `Partial`

```ts
type AppConfig = {
  darkMode: boolean;
  language: "en" | "hi";
};

const defaultConfig: AppConfig = {
  darkMode: false,
  language: "en",
};

function setupApp(config: Partial<AppConfig> = {}) {
  const finalConfig: AppConfig = { ...defaultConfig, ...config };
}
```

Yahan `Partial` se user sirf woh fields de sakta hai jo change karna chahta hai. 

***

## 7. Small cheat‑sheet (yaad rakhne ke liye)

- **Base object:**
  - `type User = { id: string; name: string; age?: number }`
- **Partial:** `Partial<User>` → sab `?` ho jaata hai (update/patch).
- **Required:** `Required<User>` → sab required (final object).
- **Pick:** `Pick<User, "id" | "name">` → sirf kuch fields.
- **Omit:** `Omit<User, "id">` → kuch fields hatao (create payload).
- **Readonly:** `Readonly<User>` → mutate nahi kar sakte.
- **Record:** `Record<string, User>` → dictionary/lookup.

Sources with more examples: 

***

## Hinglish style samjh lo

- Pehle **normal object type** banao (`type User = { ... }`).
- Phir usko baar‑baar duplicate mat karo; **utility types** se hi saare variations nikalo:
  - `Partial` = form/update jahan sab field zaroori nahi.
  - `Required` = final validated object.
  - `Pick` / `Omit` = alag‑alag views (create payload, public profile, etc.).
  - `Record` = map jaisa object, jisme har key ka same type ka value.

<!-- Agar chaho to main next message me ek chhota **real project style example** bana sakta hoon (User CRUD + types + functions), jisme ye sare Partial/Required/Omit/Pick/Record ek hi jagah use ho rahe hon. -->