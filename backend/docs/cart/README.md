# Cart & Orders API Documentation

Base URL: `http://localhost:3000/cart`

> **All routes require authentication** via the `loggedin` cookie (user JWT).

---

## POST `/cart/addItem`

**Description:** Adds an item to the logged-in user's cart. If `quantity` is not provided, defaults to 1.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{
  "itemname": "Fresh Mangoes",
  "itemprice": 5.99,
  "prodplace": "Ratnagiri, Maharashtra",
  "img": "https://images.unsplash.com/photo-example",
  "quantity": 2
}
```

### Responses

**200 OK** — Item added to cart
```json
{
  "message": "Item Successfully added to cart"
}
```

**404 Not Found** — Error (validation failure, etc.)
```json
{
  "message": "<error details>"
}
```

---

## POST `/cart/removeItem`

**Description:** Removes a specific item from the cart using its MongoDB `_id`.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{
  "id": "664f1a2b3c4d5e6f7a8b9c30"
}
```

### Responses

**200 OK** — Item removed
```json
{
  "message": "Item Successfully deleted from cart"
}
```

**404 Not Found** — Error
```json
{
  "message": "<error details>"
}
```

---

## POST `/cart/showItem`

**Description:** Returns all items in the logged-in user's cart.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{}
```

### Responses

**200 OK** — Returns array of cart items
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c30",
    "email": "john@example.com",
    "itemname": "Fresh Mangoes",
    "itemprice": 5.99,
    "prodplace": "Ratnagiri, Maharashtra",
    "img": "https://images.unsplash.com/photo-example",
    "quantity": 2
  },
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c31",
    "email": "john@example.com",
    "itemname": "Organic Tomatoes",
    "itemprice": 2.49,
    "prodplace": "Nasik, Maharashtra",
    "img": "https://images.unsplash.com/photo-example2",
    "quantity": 1
  }
]
```

**200 OK** — Empty cart
```json
[]
```

**404 Not Found** — Error
```json
{
  "message": "<error details>"
}
```

---

## POST `/cart/updateQuantity`

**Description:** Updates the quantity of a specific item in the cart.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{
  "id": "664f1a2b3c4d5e6f7a8b9c30",
  "quantity": 3
}
```

### Responses

**200 OK** — Quantity updated, returns updated cart item
```json
{
  "_id": "664f1a2b3c4d5e6f7a8b9c30",
  "email": "john@example.com",
  "itemname": "Fresh Mangoes",
  "itemprice": 5.99,
  "prodplace": "Ratnagiri, Maharashtra",
  "img": "https://images.unsplash.com/photo-example",
  "quantity": 3
}
```

**400 Bad Request** — Quantity less than 1
```json
{
  "message": "Quantity must be at least 1"
}
```

**404 Not Found** — Item not in cart
```json
{
  "message": "Item not found in cart"
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

## POST `/cart/placeOrder`

**Description:** Places an order with all items currently in the cart. Requires a delivery address. Creates an order document in the database and clears the cart.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

```json
{
  "deliveryAddress": {
    "label": "Home",
    "street": "123 MG Road, Near Station",
    "city": "Mumbai",
    "state": "Maharashtra",
    "pincode": "400001",
    "phone": "9876543210"
  }
}
```

### Responses

**200 OK** — Order placed successfully
```json
{
  "message": "Order placed successfully",
  "order": {
    "_id": "664f1a2b3c4d5e6f7a8b9c40",
    "email": "john@example.com",
    "items": [
      {
        "itemname": "Fresh Mangoes",
        "itemprice": 5.99,
        "quantity": 2,
        "prodplace": "Ratnagiri, Maharashtra",
        "img": "https://images.unsplash.com/photo-example"
      }
    ],
    "subtotal": 11.98,
    "shipping": 1.99,
    "total": 13.97,
    "status": "pending",
    "deliveryAddress": {
      "label": "Home",
      "street": "123 MG Road, Near Station",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "phone": "9876543210"
    },
    "createdAt": "2026-02-26T18:00:00.000Z"
  }
}
```

**400 Bad Request** — Missing delivery address
```json
{
  "message": "Delivery address is required"
}
```

**400 Bad Request** — Cart is empty
```json
{
  "message": "Cart is empty"
}
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

## GET `/cart/orders`

**Description:** Returns all orders placed by the logged-in user, sorted by newest first.

**Authentication:** 🔒 Required — `loggedin` cookie with valid JWT.

### Request Body

None.

### Responses

**200 OK** — Returns array of orders
```json
[
  {
    "_id": "664f1a2b3c4d5e6f7a8b9c40",
    "email": "john@example.com",
    "items": [
      {
        "itemname": "Fresh Mangoes",
        "itemprice": 5.99,
        "quantity": 2,
        "prodplace": "Ratnagiri, Maharashtra",
        "img": "https://images.unsplash.com/photo-example"
      },
      {
        "itemname": "Organic Tomatoes",
        "itemprice": 2.49,
        "quantity": 1,
        "prodplace": "Nasik, Maharashtra",
        "img": "https://images.unsplash.com/photo-example2"
      }
    ],
    "subtotal": 14.47,
    "shipping": 1.99,
    "total": 16.46,
    "status": "pending",
    "deliveryAddress": {
      "label": "Home",
      "street": "123 MG Road",
      "city": "Mumbai",
      "state": "Maharashtra",
      "pincode": "400001",
      "phone": "9876543210"
    },
    "createdAt": "2026-02-26T18:00:00.000Z"
  }
]
```

**200 OK** — No orders
```json
[]
```

**500 Internal Server Error**
```json
{
  "message": "<error details>"
}
```

---

## Order Status Values

| Status      | Description                          |
|-------------|--------------------------------------|
| `pending`   | Order placed, awaiting confirmation  |
| `confirmed` | Order confirmed by seller            |
| `shipped`   | Order has been shipped               |
| `delivered` | Order delivered to customer          |
| `cancelled` | Order was cancelled                  |
