## Type Definitions + Axios with TypeScript (Interfaces + Generics Deep Dive)

TypeScript mein **type definitions**, **interfaces**, aur **generics** ko axios ke saath combine karne se aap **fully type-safe API calls** bana sakte ho jisme compile-time pe hi errors pakde jate hain. 

***

## 1. Type Definitions in TypeScript – Quick Recap

### Type Alias (`type`)
```ts
// Primitive alias
type UserID = string | number;

// Object type
type User = {
  id: number;
  name: string;
  email: string;
};

// Union type
type Status = 'success' | 'error' | 'loading';

// Intersection type
type AdminUser = User & { role: 'admin' };
```
- **Use for:** Unions, intersections, primitives, tuples, function types 

### Interface
```ts
interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```
- **Use for:** Object shapes, class contracts, extensible structures 

### Type + Generics (Most Common Pattern)
```ts
// Generic type alias
type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

// Generic interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}
```
**Dono kaam karte hain!** Interface aur type dono generics support karte hain. 
***

## 2. Types ke Saath Generics Kaise Use Hote Hain?

### Generic Type Alias (Common Pattern)
```ts
// Generic type for API responses
type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

// Usage
interface User {
  id: number;
  name: string;
}

interface Product {
  productId: string;
  price: number;
}

// Different types ke saath reuse
const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Aman" },
  status: 200
};

const productResponse: ApiResponse<Product> = {
  data: { productId: "P123", price: 999 },
  status: 200
};
```

### Generic Interface (Same Result)
```ts
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Usage same as type
const userResponse: ApiResponse<User> = { ... };
```

**Key Point:** Type aliases aur interfaces dono generics support karte hain. Choice convention pe depend karti hai. 
***

## 3. Axios with TypeScript – Generics + Interfaces/Types

### Axios Built-in Generic Support
Axios already generics support karta hai:
```ts
axios.get<T>(url)           // T = response.data type
axios.post<T>(url, data)    // T = response.data type
axios.put<T>(url, data)
axios.delete<T>(url)
```


### Pattern 1: Basic Axios with Generic Type
```ts
import axios from 'axios';

// Define response type
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Generic type parameter specifies response.data type
const response = await axios.get<User>('/api/users/1');

// response.data is typed as User
const user: User = response.data;
console.log(user.name); // ✅ Type-safe
```

### Pattern 2: Array Response
```ts
interface Product {
  productId: string;
  name: string;
  price: number;
}

// Array of products
const response = await axios.get<Product[]>('/api/products');

// response.data is Product[]
const products: Product[] = response.data;
```


### Pattern 3: Generic API Response Wrapper (Best Practice)
```ts
// Generic interface for standardized API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Usage with axios
interface User {
  id: number;
  name: string;
  email: string;
}

const response = await axios.get<ApiResponse<User>>('/api/users/1');

// response.data is ApiResponse<User>
const apiData: ApiResponse<User> = response.data;
const user: User = apiData.data; // Nested data access
```


### Pattern 4: Paginated Response (Real-World)
```ts
// Generic paginated response
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  totalPages: number;
}

interface User {
  id: number;
  name: string;
}

// Usage
const response = await axios.get<PaginatedResponse<User>>('/api/users?page=1');

const paginatedData: PaginatedResponse<User> = response.data;
const users: User[] = paginatedData.data;
const total: number = paginatedData.total;
```


***

## 4. Complete Axios + TypeScript Examples

### Example 1: Axios Service Class with Generics
```ts
import axios, { AxiosResponse, AxiosError } from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic types for entities
interface User {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

interface Product {
  productId: string;
  name: string;
  price: number;
  inStock: boolean;
}

// Generic API response type
type APIResponse<T> = {
  data: T;
  success: boolean;
  message?: string;
};

// Service class with generic methods
class ApiService {
  // GET single item
  async getById<T>(endpoint: string, id: number): Promise<T> {
    const response = await api.get<T>(`${endpoint}/${id}`);
    return response.data;
  }

  // GET all items
  async getAll<T>(endpoint: string): Promise<T[]> {
    const response = await api.get<T[]>(endpoint);
    return response.data;
  }

  // POST create
  async create<T, R>(endpoint: string, data: T): Promise<R> {
    const response = await api.post<R>(endpoint, data);
    return response.data;
  }

  // PUT update
  async update<T>(endpoint: string, id: number, data: Partial<T>): Promise<T> {
    const response = await api.put<T>(`${endpoint}/${id}`, data);
    return response.data;
  }

  // DELETE
  async delete(endpoint: string, id: number): Promise<void> {
    await api.delete(`${endpoint}/${id}`);
  }
}

// Usage
const apiService = new ApiService();

// Fetch users
const users: User[] = await apiService.getAll<User>('/users');

// Fetch single user
const user: User = await apiService.getById<User>('/users', 1);

// Create product
const newProduct: Product = await apiService.create<
  Omit<Product, 'productId'>, 
  Product
>('/products', {
  name: "Laptop",
  price: 99999,
  inStock: true
});

// Update user
const updatedUser: User = await apiService.update<User>(
  '/users', 
  1, 
  { name: "Aman Kumar" }
);
```


***

### Example 2: Axios with Error Handling (Type-Safe)
```ts
import axios, { AxiosError, AxiosResponse } from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}

// Type-safe error handler
async function fetchUser(id: number): Promise<User | null> {
  try {
    const response = await axios.get<User>(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiError>;
      
      // Type-safe error access
      console.error('Error:', axiosError.response?.data.message);
      console.error('Code:', axiosError.response?.data.code);
      
      if (axiosError.response?.status === 404) {
        return null; // User not found
      }
    }
    throw error;
  }
}

// Usage
const user = await fetchUser(1);
if (user) {
  console.log(user.name); // ✅ Type-safe
}
```


***

### Example 3: Axios Interceptors with Generics
```ts
import axios, { AxiosResponse, AxiosError } from 'axios';

// Generic response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Create instance
const api = axios.create({
  baseURL: 'https://api.example.com',
});

// Response interceptor (type-safe)
api.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<any>>) => {
    // response.data is ApiResponse<any>
    console.log('Status:', response.data.status);
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    // Type-safe error handling
    console.error('API Error:', error.response?.data.message);
    return Promise.reject(error);
  }
);

// Usage
interface User {
  id: number;
  name: string;
}

const response = await api.get<ApiResponse<User>>('/users/1');
const userData: User = response.data.data; // Nested access
```


***

### Example 4: Next.js API Routes with Axios + Generics
```ts
// types/api.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function fetchUser(id: number): Promise<User> {
  const response = await api.get<ApiResponse<User>>(`/users/${id}`);
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to fetch user');
  }
  
  return response.data.data;
}

export async function fetchUsers(): Promise<User[]> {
  const response = await api.get<ApiResponse<User[]>>('/users');
  
  if (!response.data.success || !response.data.data) {
    throw new Error(response.data.error || 'Failed to fetch users');
  }
  
  return response.data.data;
}

// pages/api/users/[id].ts (Next.js API route)
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchUser } from '../../../services/api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: User } | { error: string }>
) {
  try {
    const { id } = req.query;
    const user = await fetchUser(Number(id));
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}
```


***

## 5. Type vs Interface with Generics – Kaun Use Karein?

### Both Work Equally Well
```ts
// Type alias with generic
type ApiResponse<T> = {
  data: T;
  status: number;
};

// Interface with generic
interface ApiResponse<T> {
  data: T;
  status: number;
}

// Both work the same with axios
const response1 = await axios.get<ApiResponse<User>>('/api/users');
const response2 = await axios.get<ApiResponse<User>>('/api/users');
```


### When to Use Type
- Union types: `type Status = 'success' | 'error'`
- Intersection types: `type Admin = User & { role: 'admin' }`
- Mapped/conditional types: `type Partial<T> = { ... }`
- Simple aliases: `type UserID = string` 
### When to Use Interface
- Object shapes (especially for API responses, entities)
- Extensible contracts (may extend/merge later)
- Class implementations (`implements InterfaceName`)
- Public API definitions 

### Practical Convention
```ts
// Entities/Models → Interface
interface User { id: number; name: string; }
interface Product { productId: string; price: number; }

// API Responses → Interface (extensible)
interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// Utility Types → Type
type PartialUser = Partial<User>;
type UserWithoutId = Omit<User, 'id'>;
type Status = 'pending' | 'success' | 'error';
```


***

## 6. Best Practices (Axios + TypeScript)

### ✅ Do:
- **Use Generics for response.data:** `axios.get<User>('/api/users')` 
- **Define Entity Interfaces:** `interface User { ... }` 
- **Create Generic Response Wrapper:** `interface ApiResponse<T> { data: T; ... }` 
- **Type AxiosError:** `AxiosError<ApiError>` for error handling 
- **Use Axios Instance:** `axios.create({...})` with base config 

### ❌ Don't:
- **Use `any`:** `axios.get<any>()` – type safety khatam ho jati hai 
- **Skip Type Definitions:** Always define `interface User { ... }` 
- **Ignore Error Types:** `catch (error: any)` – use `AxiosError<T>` 
- **Inline Types Repeatedly:** Reusable interfaces/types banao 
***

## 7. Common Patterns Table

| Pattern | Code | Use Case |
|--------|------|----------|
| Single Entity | `axios.get<User>('/users/1')` | Fetch one user |
| Array Response | `axios.get<User[]>('/users')` | Fetch all users |
| Paginated | `axios.get<PaginatedResponse<User>>('/users')` | Paginated list |
| Nested Response | `axios.get<ApiResponse<User>>('/users')` | Standardized API |
| POST Request | `axios.post<User, CreateUserDto>('/users', data)` | Create with typed body |
| Error Handling | `AxiosError<ApiError>` | Type-safe errors |
 [devsheets](https://devsheets.io/sheets/axios)

***

## 8. Practice Exercises

### Exercise 1: Basic Fetch
```ts
interface Product {
  productId: string;
  name: string;
  price: number;
}

// Fetch single product
async function getProduct(id: string): Promise<Product> {
  const response = await axios.get<Product>(`/api/products/${id}`);
  return response.data;
}

// Fetch all products
async function getProducts(): Promise<Product[]> {
  const response = await axios.get<Product[]>('/api/products');
  return response.data;
}
```

### Exercise 2: Generic Repository with Axios
```ts
interface Repository<T> {
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}

class AxiosRepository<T extends { id: number }> implements Repository<T> {
  private endpoint: string;
  
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  
  async getAll(): Promise<T[]> {
    const response = await axios.get<T[]>(this.endpoint);
    return response.data;
  }
  
  async getById(id: number): Promise<T> {
    const response = await axios.get<T>(`${this.endpoint}/${id}`);
    return response.data;
  }
  
  async create(data: Omit<T, 'id'>): Promise<T> {
    const response = await axios.post<T>(this.endpoint, data);
    return response.data;
  }
  
  async update(id: number, data: Partial<T>): Promise<T> {
    const response = await axios.put<T>(`${this.endpoint}/${id}`, data);
    return response.data;
  }
  
  async delete(id: number): Promise<void> {
    await axios.delete(`${this.endpoint}/${id}`);
  }
}

// Usage
interface User { id: number; name: string; email: string; }
const userRepository = new AxiosRepository<User>('/api/users');
const users = await userRepository.getAll();
```

### Exercise 3: Type-Safe Error Handler
```ts
interface ApiError {
  message: string;
  code: string;
  field?: string;
}

async function safeFetch<T>(url: string): Promise<T | null> {
  try {
    const response = await axios.get<T>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ApiError>(error)) {
      console.error('API Error:', error.response?.data.message);
      console.error('Error Code:', error.response?.data.code);
    }
    return null;
  }
}

// Usage
const user = await safeFetch<User>('/api/users/1');
```

***

## 9. Quick Reference (Cheat Sheet)

```ts
// 1. Define entity
interface User { id: number; name: string; }

// 2. Generic API response
interface ApiResponse<T> { data: T; status: number; }

// 3. Basic axios call
const response = await axios.get<User>('/api/users/1');
const user: User = response.data;

// 4. Array response
const users = await axios.get<User[]>('/api/users');

// 5. Paginated response
interface Paginated<T> { data: T[]; total: number; }
const paginated = await axios.get<Paginated<User>>('/api/users');

// 6. POST with typed body
const newUser = await axios.post<User, CreateUserDto>('/api/users', {
  name: "Aman",
  email: "aman@example.com"
});

// 7. Error handling
try {
  const user = await axios.get<User>('/api/users/1');
} catch (error) {
  if (axios.isAxiosError<ApiError>(error)) {
    console.error(error.response?.data.message);
  }
}
```


***

## Final Summary

### Key Takeaways:
1. **Type + Generics:** `type ApiResponse<T> = { data: T; ... }` – Works perfectly 
2. **Interface + Generics:** `interface ApiResponse<T> { data: T; ... }` – Same result 
3. **Axios Generics:** `axios.get<T>(url)` – `T` = `response.data` type 
4. **Convention:** Interface for entities/responses, Type for unions/utilities
5. **Best Practice:** Always define types, use generics, avoid `any` 

**Exam/Interview Focus:** Generic interfaces, axios type parameters, error handling with `AxiosError<T>`, aur reusable patterns (ApiResponse, Repository) sabse important hain. 

Agar Next.js, React Query, ya specific backend (Node.js/Express) ke saath examples chahiye, to batao! 