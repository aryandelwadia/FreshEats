# Admin API Documentation

Base URL: `http://localhost:3000/admin`

> **All routes (except login) require authentication** via the `adminLoggedin` cookie (admin JWT).

## Admin Credentials

| Field    | Value       |
|----------|-------------|
| Username | `ADMIN`     |
| Password | `ADMIN1234` |

---

## Authentication

### POST `/admin/login`

**Description:** Authenticates admin with hardcoded username and password. Sets an `adminLoggedin` cookie containing a JWT token on success.

**Authentication:** None required.

#### Request Body

```json
{
  "username": "ADMIN",
  "password": "ADMIN1234"
}
```

#### Responses

**200 OK** — Login successful
```json
{
  "message": "Admin logged in successfully"
}
```
> Sets cookie: `adminLoggedin=<JWT_TOKEN>` (sameSite: None, secure: true)

**401 Unauthorized** — Wrong credentials
```json
{
  "message": "Invalid admin credentials"
}
```

---

### POST `/admin/logout`

**Description:** Logs out the admin by clearing the `adminLoggedin` cookie.

**Authentication:** 🔒 Required — `adminLoggedin` cookie.

#### Request Body

```json
{}
```

#### Responses

**200 OK**
```json
{
  "message": "Admin logged out successfully"
}
```

---

## Dashboard

### GET `/admin/stats`

**Description:** Returns aggregate stats: total users, sellers, items, orders, revenue, and orders grouped by status.

**Authentication:** 🔒 Required — `adminLoggedin` cookie.

#### Responses

**200 OK**
```json
{
  "totalUsers": 42,
  "totalSellers": 8,
  "totalItems": 56,
  "totalOrders": 120,
  "totalRevenue": "4523.80",
  "ordersByStatus": {
    "pending": 15,
    "confirmed": 30,
    "shipped": 25,
    "delivered": 45,
    "cancelled": 5
  }
}
```

---

## Users CRUD

### GET `/admin/users`

**Description:** Returns all users (passwords excluded).

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
[
  {
    "_id": "664f...",
    "fname": "John",
    "lname": "Doe",
    "username": "johndoe",
    "number": 9876543210,
    "email": "john@example.com",
    "usertype": "Customer",
    "addresses": [],
    "freshpoints": 0,
    "profilePic": "default.png"
  }
]
```

---

### GET `/admin/users/:id`

**Description:** Returns a single user by ID (password excluded).

**Authentication:** 🔒 Required.

#### Responses

**200 OK** — Returns user object (same shape as above)

**404 Not Found**
```json
{
  "message": "User not found"
}
```

---

### POST `/admin/users`

**Description:** Creates a new user. Password is automatically hashed.

**Authentication:** 🔒 Required.

#### Request Body

```json
{
  "fname": "John",
  "lname": "Doe",
  "username": "johndoe",
  "number": 9876543210,
  "email": "john@example.com",
  "password": "pass123"
}
```

#### Responses

**200 OK**
```json
{
  "message": "User created successfully",
  "userId": "664f..."
}
```

**500 Internal Server Error** — Validation/duplicate error
```json
{
  "message": "<error details>"
}
```

---

### PUT `/admin/users/:id`

**Description:** Updates a user by ID. If a new password is included, it will be hashed automatically.

**Authentication:** 🔒 Required.

#### Request Body (partial updates allowed)

```json
{
  "fname": "Updated Name",
  "freshpoints": 100
}
```

#### Responses

**200 OK**
```json
{
  "message": "User updated successfully",
  "user": { ... }
}
```

**404 Not Found**
```json
{
  "message": "User not found"
}
```

---

### DELETE `/admin/users/:id`

**Description:** Deletes a user by ID. Also clears their cart data.

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
{
  "message": "User deleted successfully"
}
```

**404 Not Found**
```json
{
  "message": "User not found"
}
```

---

## Sellers CRUD

### GET `/admin/sellers`

**Description:** Returns all sellers (passwords excluded).

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
[
  {
    "_id": "664f...",
    "fname": "Jane",
    "lname": "Smith",
    "username": "janestore",
    "email": "seller@store.com",
    "storename": "Fresh Farm Store",
    "address": "456 Market Rd",
    "storenumber": 9876543212,
    "usertype": "seller"
  }
]
```

---

### GET `/admin/sellers/:id`

**Description:** Returns a single seller by ID.

**Authentication:** 🔒 Required.

#### Responses

**200 OK** — Returns seller object

**404 Not Found**
```json
{
  "message": "Seller not found"
}
```

---

### POST `/admin/sellers`

**Description:** Creates a new seller account.

**Authentication:** 🔒 Required.

#### Request Body

```json
{
  "fname": "Jane",
  "lname": "Smith",
  "username": "janestore",
  "number": 9876543211,
  "email": "seller@store.com",
  "password": "sellerpass",
  "storename": "Fresh Farm Store",
  "address": "456 Market Rd",
  "storenumber": 9876543212
}
```

#### Responses

**200 OK**
```json
{
  "message": "Seller created successfully",
  "sellerId": "664f..."
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

### PUT `/admin/sellers/:id`

**Description:** Updates a seller by ID. Password will be hashed if included.

**Authentication:** 🔒 Required.

#### Request Body (partial updates allowed)

```json
{
  "storename": "Updated Store Name"
}
```

#### Responses

**200 OK**
```json
{
  "message": "Seller updated successfully",
  "seller": { ... }
}
```

**404 Not Found**
```json
{
  "message": "Seller not found"
}
```

---

### DELETE `/admin/sellers/:id`

**Description:** Deletes a seller by ID.

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
{
  "message": "Seller deleted successfully"
}
```

**404 Not Found**
```json
{
  "message": "Seller not found"
}
```

---

## Items CRUD

### GET `/admin/items`

**Description:** Returns all shop items.

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
[
  {
    "_id": "664f...",
    "itemname": "Fresh Mangoes",
    "itemprice": 5.99,
    "prodplace": "Ratnagiri",
    "img": "https://images.unsplash.com/..."
  }
]
```

---

### POST `/admin/items`

**Description:** Creates a new item.

**Authentication:** 🔒 Required.

#### Request Body

```json
{
  "itemname": "Fresh Mangoes",
  "itemprice": 5.99,
  "prodplace": "Ratnagiri, Maharashtra",
  "img": "https://images.unsplash.com/photo-example"
}
```

#### Responses

**200 OK**
```json
{
  "message": "Item created successfully",
  "item": { ... }
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

### PUT `/admin/items/:id`

**Description:** Updates an item by ID.

**Authentication:** 🔒 Required.

#### Request Body (partial updates allowed)

```json
{
  "itemprice": 7.99
}
```

#### Responses

**200 OK**
```json
{
  "message": "Item updated successfully",
  "item": { ... }
}
```

**404 Not Found**
```json
{
  "message": "Item not found"
}
```

---

### DELETE `/admin/items/:id`

**Description:** Deletes an item by ID.

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
{
  "message": "Item deleted successfully"
}
```

**404 Not Found**
```json
{
  "message": "Item not found"
}
```

---

## Orders Management

### GET `/admin/orders`

**Description:** Returns all orders across all users, sorted newest first.

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
[
  {
    "_id": "664f...",
    "email": "john@example.com",
    "items": [...],
    "subtotal": 11.98,
    "shipping": 1.99,
    "total": 13.97,
    "status": "pending",
    "deliveryAddress": { ... },
    "createdAt": "2026-02-26T18:00:00.000Z"
  }
]
```

---

### GET `/admin/orders/:id`

**Description:** Returns a single order by ID.

**Authentication:** 🔒 Required.

#### Responses

**200 OK** — Returns order object

**404 Not Found**
```json
{
  "message": "Order not found"
}
```

---

### PUT `/admin/orders/:id/status`

**Description:** Updates the status of an order.

**Authentication:** 🔒 Required.

#### Request Body

```json
{
  "status": "shipped"
}
```

**Valid status values:** `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

#### Responses

**200 OK**
```json
{
  "message": "Order status updated",
  "order": { ... }
}
```

**400 Bad Request** — Invalid status
```json
{
  "message": "Invalid status. Must be one of: pending, confirmed, shipped, delivered, cancelled"
}
```

**404 Not Found**
```json
{
  "message": "Order not found"
}
```

---

### DELETE `/admin/orders/:id`

**Description:** Deletes an order by ID.

**Authentication:** 🔒 Required.

#### Responses

**200 OK**
```json
{
  "message": "Order deleted successfully"
}
```

**404 Not Found**
```json
{
  "message": "Order not found"
}
```

---

## Authentication Errors (All Protected Routes)

**401 Unauthorized** — No admin cookie
```json
{
  "message": "Admin Not Logged In"
}
```

**403 Forbidden** — Invalid role in token
```json
{
  "message": "Access denied"
}
```

**401 Unauthorized** — Expired or invalid token
```json
{
  "message": "Unauthorized: <error details>"
}
```
