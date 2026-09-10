# setup  typescript 
## create scr and .dist folders and also readme file if you need 
```sh 
 mkdir src dist && touch ./src/11_code.ts && touch readme.md

npm init -y 

npm install --ignore-scripts 

#npm ci 

# or you can type this 

npm clean-install  

## one line command 

npm init -y && npm install --ignore-scripts && npm clean-install 

## ts install
npm install -D typescript

# tsc install or init 
npx tsc --init 

# one line command 
❯ npm install -D typescript && npx tsc --init 

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


#   <<<<< --- OOps in Ts --- >>>>>
TypeScript me OOP ka matlab hai: **classes + types ka use karke clean, testable, scalable code likhna**, na ki sirf Java‑style inheritance copy karna. Neeche tumne jitne topics bole sab cover karunga, simple examples + best practices ke saath.

***

## 1. Basic class syntax + `public` (default)

```ts
class User {
  // fields / properties
  id: number;        // public by default
  name: string;

  // constructor
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  // method
  greet() {
    console.log(`Hello ${this.name}`);
  }
}

const u1 = new User(1, "Aman");
u1.greet();      // "Hello Aman"
console.log(u1.name); // OK (public)
```

- `public` default hota hai – likho ya na likho, same hai.
- JS me bhi classes hain, but TS me types + modifiers milte hain.

Modern shortcut (parameter properties):

```ts
class User {
  constructor(
    public id: number,
    public name: string
  ) {}
}

const u = new User(1, "Aman");
```

Ye ek hi line me field + constructor assign kar deta hai.

***

## 2. `private` – encapsulation (data hide karna)

```ts
class BankAccount {
  private balance: number; // sirf class ke andar access

  constructor(initial: number) {
    this.balance = initial;
  }

  deposit(amount: number) {
    if (amount <= 0) throw new Error("invalid amount");
    this.balance += amount;
  }

  getBalance() {
    return this.balance;
  }
}

const acc = new BankAccount(100);
// acc.balance = 1_000_000; // ❌ Error
acc.deposit(50);
console.log(acc.getBalance()); // 150
```

- Encapsulation = **internal details hide** karo, controlled methods do (like `deposit`, `getBalance`).
- React/Next projects me domain logic (money, IDs, tokens, etc.) ko aise protect karna acha pattern hai.

***

## 3. `protected` – inheritance ke liye

`protected` = class ke andar + uske child classes ke andar allowed, bahar nahi.

```ts
class Person {
  protected name: string; // child classes use kar sakti hain

  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private role: string;

  constructor(name: string, role: string) {
    super(name);
    this.role = role;
  }

  describe() {
    // this.name OK hai kyunki protected hai
    console.log(`${this.name} works as ${this.role}`);
  }
}

const e = new Employee("Sara", "Developer");
// e.name  // ❌ Error, outside access not allowed
```

Use:

- `private` → class ke bahar kahin nahi.
- `protected` → subclass me allowed.

***

## 4. `readonly` – field change nahi ho sakti

```ts
class Config {
  readonly apiUrl: string;

  constructor(url: string) {
    this.apiUrl = url;
  }

  // methods...
}

const cfg = new Config("https://api.example.com");
// cfg.apiUrl = "x"; // ❌ Error
```

Combine with modifiers:

```ts
class User {
  constructor(
    public readonly id: number,
    public name: string
  ) {}
}
```

- `id` kabhi change nahi hoga,
- `name` change ho sakta hai.

Best practice: IDs, constant settings, createdAt fields ko `readonly` rakho.

***

## 5. `static` – class ke saath related, instance ke saath nahi

```ts
class MathUtil {
  static PI = 3.14;

  static circleArea(radius: number): number {
    return this.PI * radius * radius;
  }
}

console.log(MathUtil.PI);
console.log(MathUtil.circleArea(2));
```

- Static field/method ko **class name se** access karte hain:
  - `MathUtil.circleArea(2)`
- Instance se nahi:
  - `new MathUtil().circleArea(2)` → ❌ (agar static hai)

Use cases:

- Helper utilities (e.g. `User.createFromJson`).
- Factory methods:
  ```ts
  class User {
    constructor(public id: number, public name: string) {}

    static fromJson(json: { id: number; name: string }) {
      return new User(json.id, json.name);
    }
  }

  const u = User.fromJson({ id: 1, name: "Aman" });
  ```

***

## 6. `abstract` classes – half‑implemented base classes

Abstract class: direct instantiate nahi kar sakte, sirf inherit.

```ts
abstract class Shape {
  constructor(public color: string) {}

  // abstract method: body nahi, sirf signature
  abstract area(): number;

  // normal method bhi ho sakta hai
  describe() {
    console.log(`Shape with color ${this.color}`);
  }
}

class Circle extends Shape {
  constructor(color: string, public radius: number) {
    super(color);
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }
}

const c = new Circle("red", 10);
c.describe();       // common implementation
console.log(c.area());
```

- `abstract` method **child class me implement karna hi padega** → ye hi abstraction + polymorphism ka base banata hai.
- React/Next me zyada tar interfaces + plain functions chal jate hain, heavy class hierarchies kam hoti hain, but libraries/SDKs me abstract class common hai.

***

## 7. Inheritance (`extends`) – reuse but carefully

```ts
class Animal {
  constructor(public name: string) {}

  move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const d = new Dog("Charlie");
d.bark();
d.move(10); // inherited method
```

- `extends` ka matlab: child class parent ke fields/methods inherit karega.
- `super(...)` se parent constructor call karna padta hai.

Best practice:

- Shallow inheritance thik hai (1–2 levels).
- Deep chains (`A`→`B`→`C`→`D`) avoid karo, **composition** better hota hai (niche).

***

## 8. Polymorphism – same interface, different behavior

Example with base/derived:

```ts
abstract class Notification {
  abstract send(message: string): void;
}

class EmailNotification extends Notification {
  send(message: string) {
    console.log("Sending EMAIL:", message);
  }
}

class SmsNotification extends Notification {
  send(message: string) {
    console.log("Sending SMS:", message);
  }
}

function notifyAll(notifiers: Notification[], msg: string) {
  for (const n of notifiers) {
    n.send(msg); // runtime pe correct implementation call
  }
}

notifyAll(
  [new EmailNotification(), new SmsNotification()],
  "Welcome!"
);
```

- `notifyAll` ko sirf type `Notification` pata hai.
- Actual object ka type (`EmailNotification` / `SmsNotification`) ke hisaab se method alag tareeke se run hota hai → polymorphism.

React world me ye pattern "strategy" ya "renderer" functions se bhi achieve hota hai, classes ke bina.

***

## 9. Encapsulation – access modifiers + getters/setters

Encapsulation = “internal state protect karo, bahar se direct mutate nahi hone do”.

```ts
class User {
  private _password: string;

  constructor(public username: string, password: string) {
    this._password = password;
  }

  // read-only view
  get maskedPassword(): string {
    return "*".repeat(this._password.length);
  }

  // controlled update
  set password(newPass: string) {
    if (newPass.length < 6) {
      throw new Error("Password too short");
    }
    this._password = newPass;
  }
}

const u = new User("aman", "secret");

console.log(u.maskedPassword); // "******"
u.password = "longerpass";     // setter call
// u._password  // ❌ private
```

- `get` / `set` properties React ya Next code me bhi useful hote hain jab complex rules hone hain.
- Zyada magic mat karo – simple classes rakho.

***

## 10. Composition – modern best practice (inheritance ka alternative)

**Composition = ek class ke andar doosri class/objects ka instance rakhna, instead of `extends`.**

Bad (over‑inheritance):

```ts
class Logger {
  log(message: string) { console.log(message); }
}

class UserService extends Logger {
  createUser() {
    this.log("Creating user...");
  }
}
```

Better (composition):

```ts
class Logger {
  log(message: string) {
    console.log(message);
  }
}

class UserService {
  constructor(private logger: Logger) {}

  createUser() {
    this.logger.log("Creating user...");
  }
}

const service = new UserService(new Logger());
service.createUser();
```

Benefits:

- Loose coupling, easy testing (fake logger inject kar sakte ho).
- Ye hi pattern modern TS + React/Next codebases me zyada dikhta hai (services, repositories, clients).

***

## 11. Interfaces + classes (real‑world TS pattern)

Classes ke saath **interfaces** bohot important hain:

```ts
interface Repository<T> {
  findById(id: string): Promise<T | null>;
  save(entity: T): Promise<void>;
}

class User {
  constructor(public id: string, public name: string) {}
}

class UserRepository implements Repository<User> {
  async findById(id: string): Promise<User | null> {
    // DB se fetch karne ka dummy example
    return new User(id, "Test");
  }

  async save(user: User): Promise<void> {
    // DB save
  }
}
```

- Interface se **contract** define hota hai.
- Class us contract ko implement karti hai.
- Ye pattern production TypeScript me bohot common hai (especially clean architecture / DDD style).

***

## 12. Modern best practices in TS OOP (especially for React / Next / Node)

1. **Classes ko small rakho, single responsibility**
   - Har class ek clear kaam kare: `UserService`, `AuthService`, `EmailSender`, etc.
2. **Deep inheritance mat banao**
   - 1–2 level `extends` OK.
   - Uske baad composition → "has‑a" relation (`Order` **has a** `Payment`).
3. **Access modifiers ka sensible use**
   - Default = `public` fields + methods jo API ka part hain.
   - Internal helpers → `private`.
   - Subclass ko share karna ho, bahar nahi: `protected`.
4. **`readonly` for constants**
   - IDs, config values, createdAt, etc.
5. **`static` sirf genuinely shared behavior ke liye**
   - Pure helper classes / factories – not for app‑wide global state.
6. **Interfaces pe code likho, classes implementation ho**
   - e.g. `interface Cache` + `MemoryCache`, `RedisCache` classes.
7. **React/Next apps me:**
   - UI layer (components, hooks) almost hamesha **functional** hi rehta hai.
   - OOP classes mainly:
     - API clients (`ApiClient`, `UserApi`),
     - domain models (`Cart`, `Order`),
     - services (`AuthService`, `PaymentService`).
   - Client components me heavy class hierarchies se bachna better; plain objects + functions bhi powerful hote hain.
8. **Avoid "God classes"**
   - Ek hi class me sab kuch (fetch, state, DOM, logging) mat daal do.
9. **Prefer plain data + functions jab zarurat na ho**
   - Agar tum sirf type + 2–3 helper functions chahte ho, to:
     ```ts
     type User = { id: string; name: string };

     function createUser(...) { ... }
     function renameUser(user: User, name: string): User { ... }
     ```
     Often, ye classes se simpler hota hai.

***

## 13. Short practice roadmap (OOP in TS master karne ke liye)

1. Basic class banao:
   - `User` with `id`, `name`, `greet()`.
2. Access modifiers add karo:
   - `BankAccount` with `private balance`, `deposit`, `withdraw`, `getBalance`.
3. Inheritance:
   - `Animal` → `Dog`, `Cat` with `speak()` override.
4. Abstract + polymorphism:
   - `abstract Shape` with `area()`,
   - `Circle`, `Rectangle`,
   - `printAreas(shapes: Shape[])`.
5. Composition:
   - `Logger`, `EmailService`, `UserService` jahan `UserService` logger + email ko **inject** karta hai.
6. Interface + class:
   - `Repository<T>` + `UserRepository`.

Agar tum chaho to main ek chhota **mini project style example** likh sakta hoon (e.g. E‑commerce OOP model: `Product`, `CartItem`, `CartService`, `OrderService`), taaki tum poora OOP design ek jagah dekh sako jo modern TS practices follow karta ho.

