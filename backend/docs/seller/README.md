# Seller API Documentation

Base URL: `http://localhost:3000/seller`

---

## POST `/seller/login`

**Description:** Authenticates a seller with email and password. Sets a `sellerLoggedin` cookie containing a JWT token on success.

**Authentication:** None required.

### Request Body

```json
{
  "email": "seller@store.com",
  "password": "sellerpass123"
}
```

### Responses

**200 OK** — Login successful
```json
{
  "message": "seller logged in"
}
```
> Sets cookie: `sellerLoggedin=<JWT_TOKEN>` (sameSite: None, secure: true)

**401 Unauthorized** — Wrong password
```json
{
  "message": "wrong credentials"
}
```

**404 Not Found** — Seller not found
```json
{
  "message": "seller not found"
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

## POST `/seller/signup`

**Description:** Registers a new seller account. Password is automatically hashed via bcrypt. `usertype` is set to "seller" automatically.

**Authentication:** None required.

### Request Body

```json
{
  "fname": "Jane",
  "lname": "Smith",
  "username": "janestore",
  "number": 9876543211,
  "email": "seller@store.com",
  "password": "sellerpass123",
  "storename": "Fresh Farm Store",
  "address": "456 Market Road, Mumbai",
  "storenumber": 9876543212
}
```

### Responses

**200 OK** — Signup successful
```json
{
  "message": "seller account created"
}
```

**500 Internal Server Error** — Validation error (duplicate email/username, etc.)
```json
{
  "message": "Server Error!"
}
```

---

## POST `/seller/logout`

**Description:** Logs out the current seller by clearing the `sellerLoggedin` cookie.

**Authentication:** 🔒 Required — `sellerLoggedin` cookie with valid JWT.

### Request Body

```json
{}
```

### Responses

**200 OK** — Logout successful
```json
{
  "message": "seller logged out successfully"
}
```

**500 Internal Server Error**
```json
{
  "message": "Server Error!"
}
```

---

## GET `/seller/currentseller`

**Description:** Returns the full profile of the currently logged-in seller.

**Authentication:** 🔒 Required — `sellerLoggedin` cookie with valid JWT.

### Request Body

None.

### Responses

**200 OK** — Returns seller object
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c10",
  "fname": "Jane",
  "lname": "Smith",
  "username": "janestore",
  "number": 9876543211,
  "email": "seller@store.com",
  "storename": "Fresh Farm Store",
  "address": "456 Market Road, Mumbai",
  "storenumber": 9876543212,
  "usertype": "seller"
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```
