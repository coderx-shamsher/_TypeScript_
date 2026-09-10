
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


## Types vs Interfaces in TypeScript – Complete 

TypeScript mein **types** aur **interfaces** dono hi data structures ko define karne ke liye use hote hain, lekin inka purpose, flexibility, aur use cases alag-alag hain. 

***

## 1. Technical Definitions

### Type (Type Alias)
- **Type** ek **alias** hai jo kisi bhi TypeScript type expression ko ek naam deta hai. 
- Ye **primitives** (`string`, `number`), **unions** (`A | B`), **intersections** (`A & B`), **tuples**, **functions**, aur **objects** sab ko represent kar sakta hai.  
- Syntax:
  ```ts
  type UserName = string;
  type ID = string | number;
  type User = { id: number; name: string };
  ```

### Interface
- **Interface** ek **contract** hai jo sirf **object shapes** (ya class contracts) define karta hai. 
- Ye batata hai ki object mein kaun-kaun se properties hone chahiye aur unka type kya hoga. 
- Interfaces **extend** aur **merge** ho sakte hain (declaration merging). 
- Syntax:
  ```ts
  interface User {
    id: number;
    name: string;
  }
  ```

***

## 2. Easy Language Summary (Simple Words Mein)

| Concept | Matlab | Kab Use Karein |
|--------|--------|----------------|
| **Type** | Kisi bhi type ko ek naam dena (jaise label lagana) | Jab union, intersection, primitive, tuple, ya complex type logic chahiye ho |
| **Interface** | Object ka structure define karna (jaise blueprint) | Jab object shape define karni ho jo baad mein extend ya merge ho sake |

**Simple Rule:**  
- **Object shape** → `interface` prefer karo  
- **Union / Complex type** → `type` use karo 

***

## 3. Key Differences (Table Format)

| Feature | `type` | `interface` |
|--------|--------|-------------|
| **Object shape define** | ✅ Haan | ✅ Haan |
| **Primitives define** | ✅ Haan (`type ID = string`) | ❌ Nahi |
| **Union types** | ✅ Haan (`type Status = 'active' \| 'inactive'`) | ❌ Nahi |
| **Intersection types** | ✅ Haan (`type A = B & C`) | ❌ Nahi (sirf `extends` se limited) |
| **Declaration Merging** | ❌ Nahi | ✅ Haan (same name se do interfaces merge ho jate hain) |
| **Extends / Implements** | Limited (`&` se) | ✅ Full support (`extends`, `implements`) |
| **Tuples** | ✅ Haan | ❌ Nahi |
| **Mapped / Conditional Types** | ✅ Haan | ❌ Nahi |
| **Performance (large objects)** | Thoda slower | Thoda faster (internal optimization) |  

***

## 4. Best Practices (Kya Karna Chahiye)

### ✅ Use `interface` jab:
- Object shape define karni ho (jaise API response, props, models) 
- Class implement karni ho (`implements InterfaceName`) 
- Future mein extend ya merge karna ho (declaration merging) 
- Public API ya library design kar rahe ho 

```ts
interface User {
  id: number;
  name: string;
  email?: string; // optional
}

interface AdminUser extends User {
  role: 'admin';
}
```

### ✅ Use `type` jab:
- Union types chahiye (`'success' | 'error' | 'loading'`)  
- Primitives ko alias dena ho (`type UserID = string`) 
- Tuples define karne ho (`type Point = [number, number]`) 
- Mapped / Conditional types chahiye ho 
- Data payloads / DTOs define karne ho jo extend na ho 

```ts
type Status = 'success' | 'error' | 'loading';
type APIResponse<T> = { data: T; status: Status };
type Point = [number, number];
```

***

## 5. Bad Practices (Kya Avoid Karein)

### ❌ Don't:
- **Mix unnecessarily**: Ek hi project mein randomly `type` aur `interface` mix mat karo bina reason ke. Team mein convention decide karo. 
- **Use `interface` for unions**: Interfaces unions support nahi karte, isliye `type` use karo. 
- **Overuse declaration merging**: Accidental merging se bugs aa sakte hain. Agar merging nahi chahiye, to `type` use karo. 
- **Use `any` instead of proper types**: `type` ya `interface` se strict typing rakho. 
- **Define inline object types repeatedly**: Reusability ke liye `type` ya `interface` use karo. 

```ts
// ❌ Bad: Repeated inline types
function processUser(user: { id: number; name: string }) { ... }
function updateUser(user: { id: number; name: string }) { ... }

// ✅ Good: Reusable type
interface User { id: number; name: string; }
function processUser(user: User) { ... }
```

***

## 6. Practice Examples (Code Samples)

### Example 1: Basic Object Shape
```ts
// Interface for object shape
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

const laptop: Product = {
  id: 1,
  name: "MacBook",
  price: 120000,
  inStock: true
};
```

### Example 2: Union Type with `type`
```ts
// Union type for status
type OrderStatus = 'pending' | 'shipped' | 'delivered' | 'cancelled';

interface Order {
  orderId: string;
  status: OrderStatus;
}

const myOrder: Order = {
  orderId: "ORD123",
  status: 'shipped' // ✅ Valid
  // status: 'returned' // ❌ Error: Not in union
};
```

### Example 3: Extending Interfaces
```ts
interface Person {
  name: string;
  age: number;
}

interface Employee extends Person {
  employeeId: string;
  department: string;
}

const emp: Employee = {
  name: "Rahul",
  age: 25,
  employeeId: "E001",
  department: "IT"
};
```

### Example 4: Intersection with `type`
```ts
type Identifiable = { id: string };
type Timestamped = { createdAt: Date; updatedAt: Date };

type AuditLog = Identifiable & Timestamped;

const log: AuditLog = {
  id: "log123",
  createdAt: new Date(),
  updatedAt: new Date()
};
```

### Example 5: Declaration Merging (Interface Only)
```ts
// First definition
interface Config {
  apiUrl: string;
}

// Second definition (automatically merges)
interface Config {
  timeout: number;
}

// Final shape: { apiUrl: string; timeout: number }
const appConfig: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000
};
```

### Example 6: Function Type with `type`
```ts
type MathOperation = (a: number, b: number) => number;

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;
```

***

## 7. Quick Decision Flowchart

```
Kya define kar rahe ho?
│
├─ Object shape? → interface (default choice)
│   └─ Extend/merge chahiye? → interface ✅
│
├─ Union / Primitive / Tuple? → type ✅
│
├─ Mapped / Conditional type? → type ✅
│
└─ Confused? → interface se start karo, type pe switch karo jab limitation aaye  [dev](https://dev.to/ravdz/type-vs-interface-in-typescript-what-you-really-need-to-know-2iln)
```

***

## 8. Real-World Usage (Next.js + Backend Context)

### API Response Types
```ts
// type for union status
type APIStatus = 'success' | 'error';

// interface for response shape
interface APIResponse<T> {
  status: APIStatus;
  data?: T;
  message?: string;
}

// Usage
const userResponse: APIResponse<{ id: number; name: string }> = {
  status: 'success',
  data: { id: 1, name: "Aman" }
};
```

### React Props (Convention)
```ts
// interface for props (community convention)
interface ButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return <button onClick={onClick} disabled={disabled}>{label}</button>;
};
```

***

## Final Tip

- **Default choice**: `interface` for objects, `type` for everything else 
- **Team consistency**: Project mein ek convention follow karo (e.g., "interfaces for shapes, types for unions") 
- **Exam/Interview**: Dono ke differences clear rakho – declaration merging, unions, aur extensibility key points hain 

